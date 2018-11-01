import { DiedFishery, Season, SeasonsAndPond } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, DiedFisherysServives, SeasonServices, PondsServices } from '../../services';
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
export class DiedFisheryRoute extends BaseRoute {
    public static path = '/diedFishery';
    private static instance: DiedFisheryRoute;
    private diedFisherysServives: DiedFisherysServives = new DiedFisherysServives();
    private diedFishery: DiedFishery = new DiedFishery();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    /**
     * @class DiedFisheryRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!DiedFisheryRoute.instance) {
            DiedFisheryRoute.instance = new DiedFisheryRoute();
        }
        return DiedFisheryRoute.instance.router;
    }

    private init() {
        logger.info('[DiedFisheryRoute] Creating season route.');
        this.router.post('/gets', Authentication.isLogin, this.getdiedFishery);
        this.router.post('/add', Authentication.isLogin, this.addDiedFishery);
        this.router.get('/get', Authentication.isLogin, this.getDiedFisheryById);
        this.router.put('/update', Authentication.isLogin, this.updateDiedFishery);
    }

    // Get DiedFishery
    private getdiedFishery = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.diedFisherysServives.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.DIED_FISHERY_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        [this.diedFisherysServives.Op.and]: {
                            pondId
                        }
                    }
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                diedFishery: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi, vui lòng thử lại sau.',
                error: e
            });
            throw e;
        });
    }

    //  Add DiedFishery
    private addDiedFishery = async (request: Request, response: Response, next: NextFunction) => {
        const season: Season = new Season();
        const seasonsAndPond: SeasonsAndPond = new SeasonsAndPond();
        const { seasonId, pondId, card, quantity, solutions, employee } = request.body;
        season.setSeasonId = seasonId;
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction().then(async (t: Transaction) => {
            return this.seasonAndPondServices.models.findOne({
                where: {
                    seasonId,
                    [this.seasonAndPondServices.Op.and]: {
                        pondId
                    }
                },
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Ao không tồn tại trong vụ nuôi này, vui lòng kiểm tra lại, cảm ơn!'
                });
                return t.rollback();
            }).then(async (seasonAndPond: any) => {
                if (seasonAndPond) {
                    const diedFishery: DiedFishery = new DiedFishery();
                    diedFishery.setDiedfisherys(undefined, uuidv4(), seasonAndPond.seasonAndPondId, card, quantity, solutions, employee);
                    return diedFishery.diedFisherysServives.models.create(diedFishery, { transaction: t })
                        .then(async (diedFishery$: any) => {
                            response.status(200).json({
                                success: true,
                                message: 'Chúc mừng, thêm chất thải thành công!'
                            });
                            return t.commit();
                        })
                        .catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Có lỗi xảy ra, vui lòng thử lại, cảm ơn!'
                            });
                            return t.rollback();
                        });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Ao không thuộc trong vụ nuôi'
                    });
                    return t.rollback();
                }

            });
        });
    }

    // Get DiedFishery by Id
    private getDiedFisheryById = async (request: Request, response: Response, next: NextFunction) => {
        const { diedfisheryid } = request.headers;
        const diedFishery: DiedFishery = new DiedFishery();
        diedFishery.setDiedFisheryId = diedfisheryid;
        diedFishery.getById(diedFishery.getDiedFisheryId).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                diedFishery: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không có thông tin chất thải, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    // Update
    private updateDiedFishery = async (request: Request, response: Response, next: NextFunction) => {
        const { diedFisheryId, card, employee, quantity, solutions } = request.body;
        const diedFishery: DiedFishery = new DiedFishery();
        diedFishery.setDiedFisheryId = diedFisheryId;
        if (!diedFisheryId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            diedFishery.setDiedfisherys(diedFisheryId, undefined, undefined, card, quantity, solutions, employee, undefined, undefined, undefined, undefined, undefined);
            diedFishery.update().then((res: any) => {
                if (!res) {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thông tin chất thải thành công!'
                    });
                }
            });;
        }

    }

}
