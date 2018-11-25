import { Harvest, HarvestDetail } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, SeasonServices, HarvestsServives, HarvestDetailsServives, PondsServices, StockingServices, StockingDetailsServices, BreedServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';

/**
 * @api {all} /harvests Harvest Request customer object
 * @apiName Harvest
 * @apiGroup Harvest
 *
 * @apiSuccess {String} type Json Type.
 */
export class HarvestRoute extends BaseRoute {
    public static path = '/harvests';
    private static instance: HarvestRoute;
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private harvestsServives: HarvestsServives = new HarvestsServives();
    private harvestDetailsServives: HarvestDetailsServives = new HarvestDetailsServives();
    private pondsServices: PondsServices = new PondsServices();
    private stockingServices: StockingServices = new StockingServices();
    private stockingDetailsServices: StockingDetailsServices = new StockingDetailsServices();
    private breedServives: BreedServives = new BreedServives();

    /**
     * @class HarvestRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!HarvestRoute.instance) {
            HarvestRoute.instance = new HarvestRoute();
        }
        return HarvestRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[HarvestRoute] Creating harvest route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addHarvest);
        this.router.post('/gets', Authentication.isLogin, this.getHarvest);

        // log endpoints
        this.logEndpoints(this.router, HarvestRoute.path);
    }

    // Get harvest
    private addHarvest = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, harvestId, harvestName, quantity, unitPrice } = request.body;
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
        // Lần thu hoạch mới
        if(!harvestId) {
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const harvest: Harvest = new Harvest();
                harvest.setHarvests(null, uuidv4(), seasonAndPond.seasonAndPondId, harvestName);
                const hv: any = await harvest.harvestsServives.models.create(harvest, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if(hv) {
                    const harvestDetail: HarvestDetail = new HarvestDetail();
                    harvestDetail.setHarvestdetails(uuidv4(), hv.harvestId, quantity, unitPrice);
                    harvestDetail.harvestDetailsServives.models.create(harvestDetail, {
                        transaction: t
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                        });
                        t.rollback();
                    }).then(res => {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công.'
                        });
                        t.commit();
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            });
        } else {
            const harvestDetail: HarvestDetail = new HarvestDetail();
            harvestDetail.setHarvestdetails(uuidv4(), harvestId, quantity, unitPrice);
            harvestDetail.harvestDetailsServives.models.create(harvestDetail).catch(e => {
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
    }

    /**
     * @method POST
     */
    private getHarvest = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.harvestsServives.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.HARVEST_2_SEASON_AND_POND,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                            where: {
                                seasonId
                            }
                        },
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            where: {
                                pondId
                            }
                        },
                        {
                            model: this.stockingServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_STOCKING,
                            required: false,
                            include: [
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
                            ]
                        }
                    ]
                },
                {
                    model: this.harvestDetailsServives.models,
                    as: ActionAssociateDatabase.HARVEST_2_HARVEST_DETAILS
                }
            ]
        }).then(res => {
            if(!res.length) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy nhật ký thu hoạch.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    harvests: res
                });
            }
        }).catch(e => {
            e;
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }
}
