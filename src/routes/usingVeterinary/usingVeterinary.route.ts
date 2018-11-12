import { UsingVeterinary, TakeCare } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, TakeCareServices, SeasonAndPondServices, SeasonServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';

/**
 * @api {all} /usingVeterinary UsingVeterinary Request customer object
 * @apiName UsingVeterinary
 * @apiGroup UsingVeterinary
 *
 * @apiSuccess {String} type Json Type.
 */
export class UsingVeterinaryRoute extends BaseRoute {
    public static path = '/usingVeterinary';
    private static instance: UsingVeterinaryRoute;
    private takeCareServices: TakeCareServices = new TakeCareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    /**
     * @class UsingVeterinaryRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UsingVeterinaryRoute.instance) {
            UsingVeterinaryRoute.instance = new UsingVeterinaryRoute();
        }
        return UsingVeterinaryRoute.instance.router;
    }

    private init() {
        logger.info('[UsingVeterinaryRoute] Creating Using Veterinary route.');
        this.router.post('/add', Authentication.isLogin, this.addUsingVeterinary);
    }

    /**
     * usingFood - take care type is 0
     * usingVeterinary - take care type is 1
     */
    private addUsingVeterinary = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, takeCareName, causesNSymptoms, averageSize, totalBiomass, result, latestHarvestDate, mentor, storageId, quantity } = request.body;
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
                const usingVeterinary: UsingVeterinary = new UsingVeterinary();
                usingVeterinary.setUsingveterinary(null, uuidv4(), tk.takeCareId, storageId, causesNSymptoms, averageSize, totalBiomass, quantity, result, latestHarvestDate, mentor);
                usingVeterinary.usingVeterinaryServices.models.create(usingVeterinary, {
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
}
