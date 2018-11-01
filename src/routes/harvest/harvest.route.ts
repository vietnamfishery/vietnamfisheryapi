import { Pond, UserRole, Harvest, Season, SeasonsAndPond } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonAndPondServices, HarvestsServives, HarvestDetailsServives, StockingServices, StockingDetailsServices, BreedServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class HarvestRoute extends BaseRoute {
    public static path = '/harvest';
    private static instance: HarvestRoute;
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private harvestsServives: HarvestsServives = new HarvestsServives();
    private harvestDetailsServives: HarvestDetailsServives = new HarvestDetailsServives();
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
        logger.info('[HarvestRoute] Creating ping route.');
        // this.router.post('/add', Authentication.isLogin, this.addPond);
        this.router.post('/gets', Authentication.isLogin, this.getHarvest);
        // this.router.get('/get', Authentication.isLogin, this.getHarvestById);
    }

    // Get harvest
    private getHarvest = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.harvestsServives.models.findAll({
            include: [
                {
                    model: this.harvestDetailsServives.models,
                    as: ActionAssociateDatabase.HARVEST_2_HARVEST_DETAILS
                },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.HARVEST_2_SEASON_AND_POND,
                    where: {
                        seasonId,
                        [this.harvestsServives.Op.and]: {
                            pondId
                        }
                    },
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
                        }
                    ]
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                harvest: res
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
}
