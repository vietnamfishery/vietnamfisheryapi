import { Request, Response, NextFunction } from 'express';
import { logger, MaterialServives, CouponServives, StoregeServices, BoughtBreedDetailsServives, BreedServives, HarvestDetailsServives, HarvestsServives, SeasonAndPondServices, SeasonServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { ActionAssociateDatabase } from '../../common';

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
        this.router.get('/gets/:seasonId', this.getAllPrices);

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
}
