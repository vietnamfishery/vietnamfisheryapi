import { UsingFood, TakeCare } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, TakeCareServices, SeasonAndPondServices, SeasonServices, PondsServices, UsingFoodsServices, StoregeServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';
import { DateUtil } from '../../lib';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class UsingFoodRoute extends BaseRoute {
    public static path = '/usingFoods';
    private static instance: UsingFoodRoute;
    private takeCareServices: TakeCareServices = new TakeCareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private usingFoodsServices: UsingFoodsServices = new UsingFoodsServices();
    private storegeServices: StoregeServices = new StoregeServices();
    /**
     * @class UsingFoodRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UsingFoodRoute.instance) {
            UsingFoodRoute.instance = new UsingFoodRoute();
        }
        return UsingFoodRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[UsingFoodRoute] Creating Using Food route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addUsingFood);
        this.router.post('/gets', Authentication.isLogin, this.getUsingFood);

        // log endpoints
        this.logEndpoints(this.router, UsingFoodRoute.path);
    }

    /**
     * usingFood - take care type is 0
     * usingVeterinary - take care type is 1
     */
    private addUsingFood = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, takeCareName, massOfFishery, feedingRate, storageId, quantity } = request.body;
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
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
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const onUpdate: any = await this.storegeServices.models.update({
                quantityStorages: this.sequeliz.literal(`quantityStorages - ${ quantity }`)
            }, {
                where: {
                    storageId
                },
                transaction: t,
                returning: true
            }).catch(e => {
                if(e.message === 'FailQuantity') {
                    response.status(200).json({
                        success: false,
                        message: 'Số lượng thức ăn trong kho không đủ.'
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                }
                t.rollback();
            });
            if(onUpdate) {
                const takeCare: TakeCare = new TakeCare();
                takeCare.setTakecare(null, uuidv4(), seasonAndPond.seasonAndPondId, 0, takeCareName);
                const tk: any = await this.takeCareServices.models.create(takeCare, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if (tk) {
                    const usingFood: UsingFood = new UsingFood();
                    usingFood.setUsingFoods(null, uuidv4(), storageId, tk.takeCareId, massOfFishery, feedingRate, quantity);
                    usingFood.usingFoodsServices.models.create(usingFood, {
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
                            message: 'Thêm thành công.',
                            res
                        });
                        t.commit();
                    });
                }
            } else {
                t.rollback();
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
    }

    /**
     * Get Cho ăn
     * @method POST
     */
    private getUsingFood = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, seasonId, options } = request.body;
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const query: FindOptions<any> = {
            include: [
                {
                    model: this.usingFoodsServices.models,
                    as: ActionAssociateDatabase.TAKE_CARE_2_USING_FOOD,
                    where: {
                        createdDate: {
                            [this.sequeliz.Op.between]: [
                                DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.parse(options.timeOut || new Date()), options.unitOfTime)),
                                DateUtil.getUTCDateTime(DateUtil.endOf(DateUtil.parse(options.timeOut || new Date()), options.unitOfTime))
                            ]
                        }
                    },
                    include: [
                        {
                            model: this.storegeServices.models,
                            as: ActionAssociateDatabase.USING_FOOD_2_STORAGE
                        }
                    ],
                    required: false
                }
            ],
            where: {
                type: 0
            }
        };

        if (isBoss) {
            query.include.push({
                model: this.seasonAndPondServices.models,
                as: ActionAssociateDatabase.TAKE_CARE_2_SEASON_AND_POND,
                where: {
                    seasonId,
                    pondId
                },
                attributes: []
            });
        } else {
            query.include.push({
                model: this.seasonAndPondServices.models,
                as: ActionAssociateDatabase.TAKE_CARE_2_SEASON_AND_POND,
                where: {
                    seasonId,
                    pondId
                },
                include: [
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                        where: {
                            status: 0
                        }
                    }
                ],
                attributes: []
            });
        }

        this.takeCareServices.models.findAll(query).then(res => {
            if (res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    takeCare: res
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy nhật ký cho ăn của ao này'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }
}
