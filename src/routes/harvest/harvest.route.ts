import { Harvest, HarvestDetail } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, SeasonServices } from '../../services';
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
        logger.info('[HarvestRoute] Creating ping route.');
        this.router.post('/add', Authentication.isLogin, this.addHarvest);
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
}
