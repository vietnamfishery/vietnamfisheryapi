import { DiedFishery } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, SeasonServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';

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
        logger.info('[DiedFisheryRoute] Creating Died Fishery route.');
        this.router.post('/add', Authentication.isLogin, this.addDiedFishery);
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
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
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
    }
}
