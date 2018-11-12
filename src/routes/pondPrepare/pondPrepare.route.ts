import { PondPrepare, PondPrepareDetail, Storage } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, PondPrepareServices, SeasonAndPondServices, SeasonServices, PondsServices } from '../../services';
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
export class PondPrepareRoute extends BaseRoute {
    public static path = '/PondPrepares';
    private static instance: PondPrepareRoute;
    private pondPrepareServices: PondPrepareServices = new PondPrepareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    /**
     * @class PondPrepareRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondPrepareRoute.instance) {
            PondPrepareRoute.instance = new PondPrepareRoute();
        }
        return PondPrepareRoute.instance.router;
    }

    private init() {
        logger.info('[PondPrepareRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addPrepare);
        this.router.post('/gets', Authentication.isLogin, this.getPondPrepares);
        this.router.get('/get', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);
    }

    private getPondPrepares = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.pondPrepareServices.models.findAll({
            include: [
                // {
                //     model: this.pondPrepareDetailsServices.models,
                //     as: ActionAssociateDatabase.POND_PREPARE_2_POND_PREPARE_DETAILS,
                //     // include: [
                //     //     {
                //     //         model: this.materialServices.models,
                //     //         as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_MATERIAL
                //     //     }
                //     // ]
                // },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_2_SEASON_AND_POND,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                            where: {
                                seasonId
                            },
                            attributes: ['seasonName']
                        },
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            where: {
                                pondId
                            },
                            attributes: ['pondName']
                        }
                    ]
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
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

    /**
     * Chức năng click vào 1 đợt chuẩn bị cụ thể
     */
    private getById = (request: Request, response: Response, next: NextFunction) => {
        const { pondprepareid } = request.headers;
        const pondPrepare: PondPrepare = new PondPrepare();
        pondPrepare.setPondPrepareId = pondprepareid;
        pondPrepare.getById(pondPrepare.getPondPrepareId).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không có thông tin của đợt chuẩn bị này, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    /**
     * Update tên vụ
     */
    private updatePondPrepare = (request: Request, response: Response, next: NextFunction) => {
        const pondPrepare: PondPrepare = new PondPrepare();
        const { pondPrepareId, pondprepareName } = request.body;
        if(!pondPrepareId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không khuyến khích, vui lòng quay lại sau.'
            });
            return response.end();
        }
        pondPrepare.setPondPrepareId = pondPrepareId;
        pondPrepare.setPondprepareName = pondprepareName;
        pondPrepare.update().then(res => {
            response.status(200).json({
                success: true,
                message: 'Cập nhật thành công.'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau, cảm ơn!'
            });
        });
    }

    /**
     * Thêm hoạt động chuẩn bị
     */
    private addPrepare = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, pondPrepareName, storageId, quantity } = request.body;
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
            const pondPrepare: PondPrepare = new PondPrepare();
            pondPrepare.setPondprepare(null, uuidv4(), seasonAndPond.seasonAndPondId, pondPrepareName);
            const pp: any = await pondPrepare.pondPrepareServices.models.create(pondPrepare, {
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
                t.rollback();
            });
            if(pp) {
                const storage: Storage = new Storage();
                const str: any = await storage.storegeServices.models.update(
                    {
                        quantityStorages: this.sequeliz.literal(`quantityStorages - ${ quantity }`)
                    },
                    {
                        where: {
                            storageId
                        },
                        transaction: t
                    }
                ).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                    });
                    t.rollback();
                });
                if(str) {
                    const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
                    pondPrepareDetail.setPondpreparedetails(null, uuidv4(), pp.pondPrepareId, storageId, quantity);
                    pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, {
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
                            message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                            e
                        });
                        t.rollback();
                    });
                }
            }
        });
    }
}
