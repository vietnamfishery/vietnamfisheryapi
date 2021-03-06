import { Growth } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, GrowthsServives, SeasonServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class GrowthsRoute extends BaseRoute {
    public static path = '/growths';
    private static instance: GrowthsRoute;
    private growthsServives: GrowthsServives = new GrowthsServives();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
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
        // log message
        logger.info('[GrowthsRoute] Creating growth route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addGrowth);
        this.router.post('/gets', Authentication.isLogin, this.getGrowths);
        this.router.post('/get/growthUUId', Authentication.isLogin, this.getGrowthByUUId);
        this.router.put('/update', Authentication.isLogin, this.updateGrowth);

        // log enpoints
        this.logEndpoints(this.router, GrowthsRoute.path);
    }

    // Get getgrowths
    private getGrowths = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId, ownerId } = request.body;
        this.growthsServives.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.GROWTH_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        pondId
                    }
                }
            ],
            order: [
                ['createdDate', 'DESC']
            ]
        }).then((growths) => {
            if(!!growths.length) {
                response.status(200).json({
                    success: true,
                    message: '',
                    growths
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy thông tin tăng trưởng.',
                    growths: []
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi, vui lòng thử lại sau.',
            });
        });
    }

    //  Add addgrowth
    private addGrowth = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, averageDensity, averageMass, speedOdGrowth, livingRatio } = request.body;
        const seasonAndPond: any = await this.seasonAndPondServices.models.findOne({
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    },
                    attributes: []
                }
            ],
            where: {
                pondId
            },
            attributes: ['seasonAndPondId']
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
        const growth: Growth = new Growth();
        if(seasonAndPond) {
            growth.setGrowths(null, uuidv4(), seasonAndPond.seasonAndPondId, averageDensity, averageMass, speedOdGrowth, livingRatio);
            growth.growthsServives.models.create(growth).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            }).then(res => {
                response.status(200).json({
                    success: true,
                    message: 'Thêm thành công.'
                });
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        }
    }

    private getGrowthByUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { growthUUId } = request.body;
        this.growthsServives.models.findOne({
            where: {growthUUId}
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau.'
            });
        }).then((res: any) => {
            if(!res) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    growth: res.dataValues
                });
            }
        });
    }

    // Update growth by Id
    private updateGrowth = async (request: Request, response: Response, next: NextFunction) => {
        const { growthUUId, averageDensity, averageMass, speedOdGrowth, livingRatio } = request.body;
        const growth: Growth = new Growth();
        growth.setGrowthUUId = growthUUId;
        if (!growthUUId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            growth.setGrowths(undefined, growthUUId, undefined, averageDensity, averageMass, speedOdGrowth, livingRatio, undefined, undefined, undefined, undefined, undefined);
            growth.growthsServives.models.update(growth.getFields(growth), {
                where: {
                    growthUUId
                },
                returning: true
            }).then((res: any) => {
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
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                });
            });
        }

    }

}
