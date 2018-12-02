import { UsingVeterinary, TakeCare } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, TakeCareServices, SeasonAndPondServices, SeasonServices, UsingVeterinaryServices, StoregeServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';
import { DateUtil } from '../../lib';

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
    private usingVeterinaryServices: UsingVeterinaryServices = new UsingVeterinaryServices();
    private storegeServices: StoregeServices = new StoregeServices();
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
        // log message
        logger.info('[UsingVeterinaryRoute] Creating Using Veterinary route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addUsingVeterinary);
        this.router.post('/gets', Authentication.isLogin, this.getUsingVeterinary);

        // log endpoints
        this.logEndpoints(this.router, UsingVeterinaryRoute.path);
    }

    /**
     * usingFood - take care type is 0
     * usingVeterinary - take care type is 1
     */
    private addUsingVeterinary = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, takeCareName, causesNSymptoms, averageSize, totalBiomass, result, latestHarvestDate, mentor, storageId, quantity } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
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
                quantityStorages: this.sequeliz.literal(`quantityStorages - ${quantity}`)
            }, {
                    where: {
                        storageId
                    },
                    transaction: t,
                    returning: true
                }).catch(e => {
                    if (e.message === 'FailQuantity') {
                        response.status(200).json({
                            success: false,
                            message: 'Số lượng thuốc & dược phẩm trong kho không đủ.'
                        });
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                        });
                    }
                    t.rollback();
                });
            if (onUpdate) {
                const takeCare: TakeCare = new TakeCare();
                takeCare.setTakecare(null, uuidv4(), seasonAndPond.seasonAndPondId, 1, takeCareName);
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
    private getUsingVeterinary = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, seasonId, options } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const query: FindOptions<any> = {
            include: [
                {
                    model: this.usingVeterinaryServices.models,
                    as: ActionAssociateDatabase.TAKE_CARE_2_USING_VETERINARY,
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
                            as: ActionAssociateDatabase.USING_VETERINARY_2_STORAGE
                        }
                    ],
                    required: false
                }
            ],
            where: {
                type: 1
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
