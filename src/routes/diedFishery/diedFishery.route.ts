import { DiedFishery } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, SeasonServices, DiedFisherysServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {all} /ping Died Fishery Request customer object
 * @apiName Died Fishery
 * @apiGroup Died Fishery
 *
 * @apiSuccess {String} type Json Type.
 */
export class DiedFisheryRoute extends BaseRoute {
    public static path = '/diedFishery';
    private static instance: DiedFisheryRoute;
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private diedFisherysServives: DiedFisherysServives = new DiedFisherysServives();
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
        // log message
        logger.info('[DiedFisheryRoute] Creating Died Fishery route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addDiedFishery);
        this.router.post('/gets', Authentication.isLogin, this.getDiedFishery);
        this.router.post('/get/diedFisheryUUId', Authentication.isLogin, this.getDiedFisheryByDiedFisheryUUId);
        this.router.put('/update', Authentication.isLogin, this.updateDiedFisheryByDiedFisheryUUId);

        // log path
        this.logEndpoints(this.router, DiedFisheryRoute.path);
    }

    //  Add DiedFishery
    private addDiedFishery = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, card, quantity, solutions, employee } = request.body;
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
            e;
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
        if(!!Object.keys(seasonAndPond).length) {
            const diedFishery: DiedFishery = new DiedFishery();
            diedFishery.setDiedfisherys(null, uuidv4(), seasonAndPond.seasonAndPondId, card, quantity, solutions, employee);
            diedFishery.diedFisherysServives.models.create(diedFishery).then(res => {
                response.status(200).json({
                    success: true,
                    message: 'Thêm thành công.'
                });
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền!'
            });
        }
    }

    private getDiedFishery = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId, ownerId } = request.body;
        this.diedFisherysServives.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.DIED_FISHERY_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        pondId
                    }
                }
            ],
            order: [
                ['createdDate', 'DESC']
            ]
        }).then((wastes) => {
            if(!wastes.length) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy nhật ký sử lý chất thải.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    wastes
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi, vui lòng thử lại sau.',
            });
        });
    }

    private getDiedFisheryByDiedFisheryUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { diedFisheryUUId } = request.body;
        this.diedFisherysServives.models.findOne({
            where: {
                diedFisheryUUId
            }
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
                    waste: res.dataValues
                });
            }
        });
    }

    private updateDiedFisheryByDiedFisheryUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { diedFisheryUUId, card, quantity, solutions, employee } = request.body;
        const diedFishery: DiedFishery = new DiedFishery();
        diedFishery.setDiedfisherys(null, diedFisheryUUId, undefined, card, quantity, solutions, employee);
        this.diedFisherysServives.models.update({ card, quantity, solutions, employee }, {
            where: {
                diedFisheryUUId
            },
            returning: true
        }).then((res: any) => {
            if (!res.length) {
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
