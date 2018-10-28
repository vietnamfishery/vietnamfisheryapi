import { PondPrepare, PondPrepareDetail, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, PondsServices, PondPrepareServices, SeasonAndPondServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer, ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondPrepareRoute extends BaseRoute {
    public static path = '/PondPrepares';
    private static instance: PondPrepareRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private pondPrepareServices: PondPrepareServices = new PondPrepareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    /**
     * @class PondPrepareRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondPrepareRoute.instance) {
            PondPrepareRoute.instance = new PondPrepareRoute();
        }
        return PondPrepareRoute.instance.router;
    }

    private init() {
        logger.info('[PondPrepareRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addPondPondPrepare);
        this.router.post('/gets', Authentication.isLogin, this.getPondPrepares);
        this.router.get('/get/:seasonId', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);
    }

    /**
     * Thêm lần chuẩn bị
     * @params [seasonAndPondId, pondprepareName, notes?, materialId]
     */
    private addPondPondPrepare = (request: Request, response: Response, next: NextFunction) => {
        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
        const { pondPrepareId, materialId, quantity } = request.body;
        pondPrepareDetail.setPondpreparedetails(undefined, uuidv4(), pondPrepareId, materialId, quantity);
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction().then(async (t: Transaction) => {
            const material = new Material();
            return material.materialServives.models.update({
                quantity: sequeliz.literal(`quantity - ${ quantity }`),
            }, {
                where: {
                    materialId
                },
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Trong kho không đủ số lượng, vui lòng kiểm tra lại, cảm ơn!.'
                });
                t.rollback();
            }).then(async () => {
                return pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, { transaction: t }).then(() => {
                    response.status(200).json({
                        success: true,
                        message: 'Thao tác thành công.'
                    });
                    return t.commit();
                }).catch(e => {
                    response.status(200).json({
                        success: true,
                        message: 'Có lỗi xảy ra, chưa thêm được nhật ký chuẩn bị, xin thử lại, cảm ơn!'
                    });
                });
            });
        });
    }

    private getPondPrepares = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.pondPrepareServices.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        [this.seasonAndPondServices.Op.and] : {
                            pondId
                        }
                    }
                }
            ]
        }).then((res) => {
            const r = res;
            response.status(200).json({res});
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi, vui lòng thử lại sau.'
            });
        });
    }

    private getById = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updatePondPrepare = (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
