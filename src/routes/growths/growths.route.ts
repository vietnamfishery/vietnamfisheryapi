import { Season, SeasonsAndPond, Growth } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, GrowthsServives, SeasonServices, PondsServices } from '../../services';
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
export class GrowthsRoute extends BaseRoute {
    public static path = '/growth';
    private static instance: GrowthsRoute;
    private growthsServives: GrowthsServives = new GrowthsServives();
    private growth: Growth = new Growth();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    /**
     * @class GrowthsRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!GrowthsRoute.instance) {
            GrowthsRoute.instance = new GrowthsRoute();
        }
        return GrowthsRoute.instance.router;
    }

    private init() {
        logger.info('[GrowthsRoute] Creating season route.');
        this.router.post('/gets', Authentication.isLogin, this.getgrowths);
        this.router.post('/add', Authentication.isLogin, this.addgrowth);
        this.router.get('/get', Authentication.isLogin, this.getGrowthById);
        this.router.put('/update', Authentication.isLogin, this.updateGrowth);
    }

    // Get getgrowths
    private getgrowths = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.growthsServives.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.GROWTH_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        [this.growthsServives.Op.and]: {
                            pondId
                        }
                    }
                }
            ],
            order: [
                ['createdDate', 'DESC']
            ]
        }).then((growths) => {
            response.status(200).json({
                success: true,
                message: '',
                growths
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

    //  Add addgrowth
    private addgrowth = async (request: Request, response: Response, next: NextFunction) => {
        const season: Season = new Season();
        const seasonsAndPond: SeasonsAndPond = new SeasonsAndPond();
        const { seasonId, pondId, averageDensity, averageMass, speedOdGrowth, livingRatio } = request.body;
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
                    const growth: Growth = new Growth();
                    growth.setGrowths(undefined, uuidv4(), seasonAndPond.seasonAndPondId, averageDensity, averageMass, speedOdGrowth, livingRatio);
                    return growth.growthsServives.models.create(growth, { transaction: t })
                        .then(async (growth$: any) => {
                            response.status(200).json({
                                success: true,
                                message: 'Chúc mừng, thêm ghi chú tăng trưởng thành công!'
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

    // Get growth by Id
    private getGrowthById = async (request: Request, response: Response, next: NextFunction) => {
        const { growthid } = request.headers;
        const growth: Growth = new Growth();
        growth.setGrowthId = growthid;
        growth.getById(growth.getGrowthId).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                growth: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không có thông tin tăng trưởng, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    // Update growth by Id
    private updateGrowth = async (request: Request, response: Response, next: NextFunction) => {
        const { growthId, averageDensity, averageMass, speedOdGrowth, livingRatio } = request.body;
        const growth: Growth = new Growth();
        growth.setGrowthId = growthId;
        if (!growthId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            growth.setGrowths(growthId, undefined, undefined, averageDensity, averageMass, speedOdGrowth, livingRatio, undefined, undefined, undefined, undefined, undefined);
            growth.update().then((res: any) => {
                if (!res) {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thông tin tăng trưởng thành công!'
                    });
                }
            });
        }

    }

}
