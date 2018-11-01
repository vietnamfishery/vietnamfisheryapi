import { Pond, UserRole } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, PondsServices, SeasonAndPondServices, StockingServices, StockingDetailsServices, BreedServives, BoughtBreedDetailsServives, BoughtBreedServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionAssociateDatabase, actionUserServices } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class StockingRoute extends BaseRoute {
    public static path = '/stocking';
    private static instance: StockingRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private stockingServices: StockingServices = new StockingServices();
    private stockingDetailsServices: StockingDetailsServices = new StockingDetailsServices();
    private breedServives: BreedServives = new BreedServives();
    private boughtBreedDetailsServives: BoughtBreedDetailsServives = new BoughtBreedDetailsServives();
    private boughtBreedServives: BoughtBreedServives = new BoughtBreedServives();
    /**
     * @class StockingRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!StockingRoute.instance) {
            StockingRoute.instance = new StockingRoute();
        }
        return StockingRoute.instance.router;
    }

    private init() {
        logger.info('[StockingRoute] Creating ping route.');
        this.router.post('/add', Authentication.isLogin, this.addPond);
        this.router.post('/gets', Authentication.isLogin, this.getStocking);
        this.router.get('/get/:pondId', Authentication.isLogin, this.getPondById);
        this.router.put('/update', Authentication.isLogin, this.updatePond);
    }

    // Get stocking
    private getStocking = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.stockingServices.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.STOCKING_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        [this.stockingServices.Op.and]: {
                            pondId
                        }
                    }
                },
                {
                    model: this.stockingDetailsServices.models,
                    as: ActionAssociateDatabase.STOCKING_2_STOCKING_DETAILS,
                    include: [
                        {
                            model: this.breedServives.models,
                            as: ActionAssociateDatabase.STOCKING_DETAILS_2_BREED,
                            include: [
                                {
                                    model: this.boughtBreedDetailsServives.models,
                                    as: ActionAssociateDatabase.BREED_2_BOUGHT_BREED_DETAIL,
                                    include: [
                                        {
                                            model: this.boughtBreedServives.models,
                                            as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BOUGHT_BREED,
                                            where: {
                                                seasonId
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                stockings: res
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

    private addPond = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, employee } = request.body;
        if (!pondName || !pondCreatedDate || !pondArea || !pondDepth || !createCost || !images || !status) {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
            });
        } else {
            pond.setPond(null, uuidv4(), decodetoken.userId, pondName, pondArea, pondDepth, createCost, status, images || defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
            pond.insert(employee).then((res: any) => {
                if (res) {
                    response.status(200).json({
                        success: true,
                        message: 'Thêm ao thành công!',
                    });
                }
            }).catch(e => {
                if (e) {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                    });
                }
            });
        }
    }

    private getPonds = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        pond.pondsServices.get({
            userId: decodetoken.userId
        }).then(async (res: any) => {
            const endData = [];
            for (const e of res.ponds) {
                e[`images`] = await GoogleDrive.delayGetFileById(e.images);
                endData.push(e);
            }
            response.status(200).json({
                success: true,
                ponds: endData
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    private getPondById = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const { pondId } = request.params;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        pond.getById(pondId, decodetoken.userId).then(async (pond$: any) => {
            if (!pond$) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
                });
            } else {
                const p: any = pond$;
                p[`images`] = await GoogleDrive.delayGetFileById(pond$.images);
                response.status(200).json(p);
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập api này!'
            });
        });
    }

    private updatePond = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, employee } = request.body;
        if (!pondId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            pond.setPond(pondId, undefined, decodetoken.userId, pondName, pondArea, pondDepth, createCost, status, images || defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
            pond.update().then((res: any) => {
                if (!res) {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thành công!'
                    });
                }
            });
        }
    }
}
