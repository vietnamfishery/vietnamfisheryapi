import { Stocking, StockingDetail } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, SeasonAndPondServices, BreedServives } from '../../services';
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
        this.router.post('/add', Authentication.isLogin, this.addStocking);
    }

    private addStocking = async (request: Request, response: Response, next: NextFunction) => {
        const { ownerId, pondId, breedId, stockingQuantity, phFirst, salinityFirst, notes } = request.body;
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
            stocking.setStocking(null, uuidv4(), seasonAndPond.seasonAndPondId, notes);
            const st: any = await stocking.stockingServices.models.create(stocking, {
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
                t.rollback();
            });
            if(st) {
                const onUpdate: any = await this.breedServives.models.update(
                    {
                        totalQuantity: this.sequeliz.literal(`totalQuantity - ${ stockingQuantity }`)
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
                if(onUpdate) {
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
}
