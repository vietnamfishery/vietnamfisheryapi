import { PondPrepare, Season, SeasonsAndPond} from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, PondPrepareServices, SeasonAndPondServices, PondPrepareDetailsServices, SeasonServices, PondsServices, MaterialServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
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
    private pondPrepareServices: PondPrepareServices = new PondPrepareServices();
    private pondPrepareDetailsServices: PondPrepareDetailsServices = new PondPrepareDetailsServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private materialServices: MaterialServives = new MaterialServives();
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
        this.router.get('/get', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);
    }

    /**
     * Thêm lần chuẩn bị
     * @params [seasonAndPondId, pondprepareName, notes?, materialId]
     */
    private addPondPondPrepare = (request: Request, response: Response, next: NextFunction) => {
        const season: Season = new Season();
        const seasonsAndPond: SeasonsAndPond = new SeasonsAndPond();
        const { seasonId, pondId, pondprepareName } = request.body;
        season.setSeasonId = seasonId;
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction().then(async (t: Transaction) => {
            return seasonsAndPond.seasonAndPondServices.models.findOne({
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
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Ao không tồn tại trong vụ nuôi này, vui lòng kiểm tra lại, cảm ơn!'
                });
            }).then(async (seasonAndPond: any) => {
                // Thêm pond Prepare
                const pondPrepare: PondPrepare = new PondPrepare();
                pondPrepare.setPondprepare(undefined, uuidv4(), seasonAndPond.seasonAndPondId, pondprepareName);
                return pondPrepare.pondPrepareServices.models.create(pondPrepare, { transaction: t })
                    .then(async (pondPrepare$: any) => {
                        response.status(200).json({
                            success: true,
                            message: 'Chúc mừng, thêm lần chuẩn bị thành công!'
                        });
                    })
                    .catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thử lại, cảm ơn!'
                        });
                        return t.rollback();
                    });
            });
        });
    }

    private getPondPrepares = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.pondPrepareServices.models.findAll({
            include: [
                {
                    model: this.pondPrepareDetailsServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_2_POND_PREPARE_DETAILS,
                    include: [
                        {
                            model: this.materialServices.models,
                            as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_MATERIAL
                        }
                    ]
                },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_2_SEASON_AND_POND,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                            where: {
                                seasonId
                            },
                            attributes: ['seasonName']
                        },
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            where: {
                                pondId
                            },
                            attributes: ['pondName']
                        }
                    ]
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
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

    /**
     * Chức năng click vào 1 đợt chuẩn bị cụ thể
     */
    private getById = (request: Request, response: Response, next: NextFunction) => {
        const { pondprepareid } = request.headers;
        const pondPrepare: PondPrepare = new PondPrepare();
        pondPrepare.setPondPrepareId = pondprepareid;
        pondPrepare.getById(pondPrepare.getPondPrepareId).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không có thông tin của đợt chuẩn bị này, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    /**
     * Update tên vụ
     */
    private updatePondPrepare = (request: Request, response: Response, next: NextFunction) => {
        const pondPrepare: PondPrepare = new PondPrepare();
        const { pondPrepareId, pondprepareName } = request.body;
        if(!pondPrepareId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không khuyến khích, vui lòng quay lại sau.'
            });
            return response.end();
        }
        pondPrepare.setPondPrepareId = pondPrepareId;
        pondPrepare.setPondprepareName = pondprepareName;
        pondPrepare.update().then(res => {
            response.status(200).json({
                success: true,
                message: 'Cập nhật thành công.'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau, cảm ơn!'
            });
        });
    }
}
