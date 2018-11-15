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
        logger.info('[GrowthsRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addgrowth);
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
