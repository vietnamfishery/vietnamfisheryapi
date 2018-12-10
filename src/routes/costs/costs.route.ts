import { Request, Response, NextFunction } from 'express';
import { logger, MaterialServives, CouponServives, StoregeServices, BoughtBreedDetailsServives, BreedServives, HarvestDetailsServives, HarvestsServives, SeasonAndPondServices, SeasonServices, StockingServices, StockingDetailsServices, PondsServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { ActionAssociateDatabase } from '../../common';
import { FindOptions, Transaction } from 'sequelize';
import { sumBy, groupBy, uniqBy } from 'lodash';

/**
 * @api {get} /costs Cost Request customer object
 * @apiName Cost
 * @apiGroup Cost
 *
 * @apiSuccess {String} type Json Type.
 */
export class CostsRoute extends BaseRoute {
    public static path = '/costs';
    private static instance: CostsRoute;
    private materialServives: MaterialServives = new MaterialServives();
    private couponServives: CouponServives = new CouponServives();
    private storegeServices: StoregeServices = new StoregeServices();
    private boughtBreedDetailsServives: BoughtBreedDetailsServives = new BoughtBreedDetailsServives();
    private breedServives: BreedServives = new BreedServives();
    private harvestDetailsServives: HarvestDetailsServives = new HarvestDetailsServives();
    private harvestsServives: HarvestsServives = new HarvestsServives();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private stockingServices: StockingServices = new StockingServices();
    private stockingDetailsServices: StockingDetailsServices = new StockingDetailsServices();
    private pondsServices: PondsServices = new PondsServices();
    /**
     * @class CostsRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!CostsRoute.instance) {
            CostsRoute.instance = new CostsRoute();
        }
        return CostsRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[CostsRoute] Creating prices route.');

        // add route
        // this.router.get('/gets/:seasonId', this.getAllPrices);
        this.router.get('/gets/storage/:seasonUUId', this.storageCost);
        this.router.get('/gets/breed/:seasonUUId', this.breedCost);
        this.router.get('/gets/harvest/:seasonUUId', this.harvestCalculator);

        // log endpoint
        this.logEndpoints(this.router, CostsRoute.path);
    }

    private getAllPrices = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;

        const mat: any = await this.materialServives.models.findAll({
            attributes: [[this.sequeliz.literal('SUM(quantity*unitPrice)'), 'totalPrices']] as any,
            include: [
                {
                    model: this.couponServives.models,
                    as: ActionAssociateDatabase.MATERIAL_2_COUPON,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.COUPON_2_SEASON,
                            where: {
                                userId
                            }
                        }
                    ]
                },
                {
                    model: this.storegeServices.models,
                    as: ActionAssociateDatabase.MATERIAL_2_STORAGE
                }
            ],
            group: ['type']
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });

        const bre: any = await this.boughtBreedDetailsServives.models.findAll({
            attributes: [[this.sequeliz.literal('SUM(quantity*unitPrice)'), 'totalPrices']] as any,
            include: [
                {
                    model: this.couponServives.models,
                    as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_COUPON,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.COUPON_2_SEASON,
                            where: {
                                userId
                            }
                        }
                    ]
                },
                {
                    model: this.breedServives.models,
                    as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BREED
                }
            ]
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });

        const har: any = await this.harvestDetailsServives.models.findAll({
            attributes: [[this.sequeliz.literal('SUM(quantity*unitPrice)'), 'totalPrices']] as any,
            include: [
                {
                    model: this.harvestsServives.models,
                    as: ActionAssociateDatabase.HARVEST_DETAIL_2_HARVEST,
                    include: [
                        {
                            model: this.seasonAndPondServices.models,
                            as: ActionAssociateDatabase.HARVEST_2_SEASON_AND_POND,
                            include: [
                                {
                                    model: this.seasonServices.models,
                                    as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                                    where: {
                                        userId
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            group: ['harvest.seasonAndPondId']
        }).catch(e => {
            e;
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });

        if(!!mat.length && !!bre.length && !!har.length) {
            response.status(200).json({
                success: true,
                message: '',
                storages: mat,
                breeds: bre,
                harvest: har
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Không tìm thấy thông tin chi phí của vụ nuôi này.',
                results: []
            });
        }
    }

    private storageCost = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;

        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const query: FindOptions<any> = {
                include: [
                    {
                        model: this.materialServives.models,
                        as: ActionAssociateDatabase.COUPON_2_MATERIAL,
                        include: [
                            {
                                model: this.storegeServices.models,
                                as: ActionAssociateDatabase.MATERIAL_2_STORAGE
                            }
                        ]
                    },
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.COUPON_2_SEASON,
                        where: {
                            userId,
                            seasonUUId
                        }
                    }
                ],
                transaction: t
            };
            const tables: any = await this.couponServives.models.findAll(query);

            query.attributes =  [
                [this.sequeliz.literal(`SUM(materials.quantity*materials.unitPrice)`), 'totals'],
                'createdDate'
            ];
            query.group = [
                this.sequeliz.fn('YEAR', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN')),
                this.sequeliz.fn('MONTH', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN')),
                this.sequeliz.fn('DAY', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN')),
                this.sequeliz.col('materials->storage.type')
            ];

            const charts: any = await this.couponServives.models.findAll(query);

            const labels: any = uniqBy(charts, (u: any) => {
                const d: Date = new Date(u.createdDate);
                return d.getDate() + d.getMonth() + d.getFullYear();
            });

            return new Promise((resolve, reject) => {
                t.commit();
                if(!!tables.length && !!charts.length) {
                    resolve({
                        tables,
                        charts,
                        labels: labels.map(e => e.createdDate)
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Không tìm thấy thông tin NHẬP KHO.',
                        tables: [],
                        charts: [],
                        labels: []
                    });
                }
            });
        }).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                ...res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        });
    }

    private breedCost = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;

        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const query: FindOptions<any> = {
                include: [
                    {
                        model: this.boughtBreedDetailsServives.models,
                        as: ActionAssociateDatabase.COUPON_2_BOUGHT_BREED_DETAILS,
                        include: [
                            {
                                model: this.breedServives.models,
                                as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BREED
                            }
                        ]
                    },
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.COUPON_2_SEASON,
                        where: {
                            userId,
                            seasonUUId
                        }
                    }
                ],
                transaction: t
            };
            const tables: any = await this.couponServives.models.findAll(query);

            query.attributes =  [
                [this.sequeliz.literal(`SUM(boughtBreedDetails.quantity*boughtBreedDetails.unitPrice)`), 'totals'],
                'createdDate'
            ];
            query.group = [
                this.sequeliz.fn('YEAR', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN')),
                this.sequeliz.fn('MONTH', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN')),
                this.sequeliz.fn('DAY', this.sequeliz.fn('CONVERT_TZ',this.sequeliz.col('coupons.createdDate'),'UTC','vi-VN'))
            ];

            const charts: any = await this.couponServives.models.findAll(query);

            let labels: any = uniqBy(charts, (u: any) => {
                const d: Date = new Date(u.createdDate);
                return d.getDate() + d.getMonth() + d.getFullYear();
            });

            labels = labels.map(e => {
                const dL: Date = new Date(e.createdDate);
                const isDL: number = dL.getDate() + dL.getMonth() + dL.getFullYear();
                const sum: number = sumBy(charts, (u: any) => {
                    const dS: Date = new Date(u.createdDate);
                    const isDS: number = dS.getDate() + dS.getMonth() + dS.getFullYear();
                    if(isDL === isDS) {
                        return u.quantity * u.unitPrice;
                    } else {
                        false;
                    }
                });
                e[`totals`] = sum;
                return e;
            });

            return new Promise((resolve, reject) => {
                t.commit();
                if(!!tables.length && !!charts.length) {
                    resolve({
                        tables,
                        charts,
                        labels
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Không tìm thấy thông tin NHẬP GIỐNG.',
                        tables: [],
                        charts: [],
                        labels: []
                    });
                }
            });
        }).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                ...res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau!'
            });
        });
    }

    /** 8da8abfa-bf60-4f9f-ada7-9fcbdf905ef5 */
    private harvestCalculator = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;

        return this.sequeliz.transaction().then(async (t: Transaction) => {
            let charts: any = await this.harvestsServives.models.findAll({
                include: [
                    {
                        model: this.harvestDetailsServives.models,
                        as: ActionAssociateDatabase.HARVEST_2_HARVEST_DETAILS
                    },
                    {
                        model: this.seasonAndPondServices.models,
                        as: ActionAssociateDatabase.HARVEST_2_SEASON_AND_POND,
                        required: true,
                        include: [
                            {
                                model: this.stockingServices.models,
                                as: ActionAssociateDatabase.SEASON_AND_POND_2_STOCKING,
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
                            },
                            {
                                model: this.seasonServices.models,
                                as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                                required: true,
                                where: {
                                    userId,
                                    seasonUUId
                                }
                            },
                            {
                                model: this.pondsServices.models,
                                as: ActionAssociateDatabase.SEASON_AND_POND_2_POND
                            }
                        ]
                    }
                ]
            });

            return new Promise((resolve, reject) => {
                t.commit();
                charts = charts.map((e: any) => {
                    const dL: Date = new Date(e.createdDate);
                    const isDL: number = dL.getDate() + dL.getMonth() + dL.getFullYear();
                    for(const e$ of charts) {
                        const dS: Date = new Date(e$.createdDate);
                        const isDS: number = dS.getDate() + dS.getMonth() + dS.getFullYear();
                        if(isDL === isDS) {
                            e.dataValues[`totals`] = e.details[0].quantity * e.details[0].unitPrice;
                            return e.dataValues;
                        }
                    }
                });
                return resolve(charts);
                // if(!!tables.length && !!charts.length) {
                //     resolve({
                //         tables,
                //         charts
                //     });
                // } else {
                //     resolve({
                //         success: false,
                //         message: 'Không tìm thấy thông tin NHẬP GIỐNG.'
                //     });
                // }
            });
        }).then((res: any) => {
            if(!!res.length) {
                response.status(200).json({
                    success: true,
                    message: '',
                    charts: res
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy thông tin THU HOẠCH.',
                    charts: []
                });
            }
        }).catch(e => {
            e;
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        });
    }
}
