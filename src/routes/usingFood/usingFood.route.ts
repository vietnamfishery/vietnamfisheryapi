import { UsingFood, TakeCare } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, TakeCareServices, SeasonAndPondServices, SeasonServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';

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
        logger.info('[UsingFoodRoute] Creating Using Food route.');
        this.router.post('/add', Authentication.isLogin, this.addUsingFood);
    }

    /**
     * usingFood - take care type is 0
     * usingVeterinary - take care type is 1
     */
    private addUsingFood = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, takeCareName, massOfFishery, feedingRate, storageId, quantity } = request.body;
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
            if(tk) {
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
    }

    private getUsingFood = async (request: Request, response: Response, next: NextFunction) => {
        // const token: string = request.headers.authorization;
        // const deToken: any = Authentication.detoken(token);
        // const { userId } = deToken;
        // const ownerId =
    }
}
