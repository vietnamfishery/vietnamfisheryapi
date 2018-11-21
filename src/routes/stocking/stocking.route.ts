import { Stocking, StockingDetail } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, SeasonAndPondServices, BreedServives, StockingServices, StockingDetailsServices, PondsServices, UserServives, PondUserRolesServices } from '../../services';
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
export class StockingRoute extends BaseRoute {
    public static path = '/stocking';
    private static instance: StockingRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private breedServives: BreedServives = new BreedServives();
    private stockingServices: StockingServices = new StockingServices();
    private stockingDetailsServices: StockingDetailsServices = new StockingDetailsServices();
    private pondsServices: PondsServices = new PondsServices();
    private userServives: UserServives = new UserServives();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
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
        // log message
        logger.info('[StockingRoute] Creating stocking route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addStocking);
        this.router.post('/gets', Authentication.isLogin, this.getStocking);
        this.router.post('/get/stockingDetailUUId', Authentication.isLogin, this.getStockingDetailsByStockingDetailsUUId);
        this.router.put('/update', Authentication.isLogin, this.updateStockingDetailsByStockingDetailsUUId);

        // log endpoint
        this.logEndpoints(this.router, StockingRoute.path);
    }

    private addStocking = async (request: Request, response: Response, next: NextFunction) => {
        const { ownerId, pondId, breedId, stockingQuantity, phFirst, salinityFirst, notes, createdDate } = request.body;
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
        this.sequeliz.transaction().then(async (t: Transaction) => {
            const stocking: Stocking = new Stocking();
            stocking.setStocking(null, uuidv4(), seasonAndPond.seasonAndPondId, notes, createdDate);
            const st: any = await stocking.stockingServices.models.create(stocking, {
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
                t.rollback();
            });
            if (st) {
                const onUpdate: any = await this.breedServives.models.update(
                    {
                        totalQuantity: this.sequeliz.literal(`totalQuantity - ${stockingQuantity}`)
                    },
                    {
                        where: {
                            breedId // lấy ra từ form select get từ api breed, chỉ có breed của owner hiện tại
                        }
                    }
                ).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if (onUpdate) {
                    const stockingDetail: StockingDetail = new StockingDetail();
                    stockingDetail.setStockingdetails(uuidv4(), breedId, st.stockingId, stockingQuantity, phFirst, salinityFirst);
                    stockingDetail.stockingDetailsServices.models.create(stockingDetail, {
                        transaction: t
                    }).then(res => {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công.'
                        });
                        t.commit();
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                        });
                        t.rollback();
                    });
                }
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
    }

    private getStocking = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, ownerId } = request.body;
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        this.stockingServices.models.findAll(({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.STOCKING_2_SEASON_AND_POND,
                    where: {
                        seasonId
                    },
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                            where: {
                                userId: ownerId
                            },
                            attributes: []
                        },
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            include: [
                                {
                                    model: this.userServives.models,
                                    as: ActionAssociateDatabase.POND_2_EMPLOYEE,
                                    required: false,
                                    attributes: []
                                },
                                {
                                    model: this.pondUserRolesServices.models,
                                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                                    required: false,
                                    attributes: []
                                }
                            ]
                        }
                    ],
                },
                {
                    model: this.stockingDetailsServices.models,
                    as: ActionAssociateDatabase.STOCKING_2_STOCKING_DETAILS,
                    include: [
                        {
                            model: this.breedServives.models,
                            as: ActionAssociateDatabase.STOCKING_DETAILS_2_BREED
                        }
                    ]
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        '$seasonAndPond->ponds.userId$': deToken.userId
                    },
                    {
                        '$seasonAndPond->ponds->users->ponduserroles.userId$': deToken.userId
                    }
                ]
            }
        } as any)).then(res => {
            if (!res.length) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy nhật ký thả ao.',
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    stocking: res
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: true,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                e
            });
        });
    }

    private getStockingDetailsByStockingDetailsUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { stockingDetailUUId } = request.body;
        this.stockingDetailsServices.models.findOne({
            where: {
                stockingDetailUUId
            }
        }).then(res => {
            if (!res) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy hoạt động thả nuôi.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    stockingDetails: res
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra.'
            });
        });
    }

    private updateStockingDetailsByStockingDetailsUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { stockingDetailUUId, breedId, stockingQuantity } = request.body;
        this.stockingDetailsServices.models.update({
            breedId, stockingQuantity
        }, {
            where: {
                stockingDetailUUId
            },
            returning: true
        }).then(res => {
            if (!res.length) {
                response.status(200).json({
                    success: false,
                    message: 'Thất bại, vui lòng thử lại sau.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Cập nhật thành công!'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra.'
            });
        });
    }
}
