import { PondPrepare, PondPrepareDetail, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, PondPrepareServices, PondPrepareDetailsServices, MaterialServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
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
export class PondPrepareDetailRoute extends BaseRoute {
    public static path = '/PondPrepareDetails';
    private static instance: PondPrepareDetailRoute;
    private pondPrepareDetailsServices: PondPrepareDetailsServices = new PondPrepareDetailsServices();
    private pondPrepareServices: PondPrepareServices = new PondPrepareServices();
    private materialServices: MaterialServives = new MaterialServives();
    /**
     * @class PondPrepareDetailRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondPrepareDetailRoute.instance) {
            PondPrepareDetailRoute.instance = new PondPrepareDetailRoute();
        }
        return PondPrepareDetailRoute.instance.router;
    }

    private init() {
        logger.info('[PondPrepareDetailRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addDetail);
        this.router.get('/gets', Authentication.isLogin, this.getPondPrepareDetails);
        // this.router.get('/get', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);
    }

    /**
     * Thêm lần chuẩn bị
     * @params [seasonAndPondId, pondprepareName, notes?, materialId]
     */
    private addDetail = async (request: Request, response: Response, next: NextFunction) => {
        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
        const { pondPrepareId, materialId, quantity } = request.body;
        pondPrepareDetail.setPondpreparedetails(undefined, uuidv4(), pondPrepareId, materialId, quantity);
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction().then(async (t: Transaction) => {
            const material = new Material();
            return material.materialServives.models.update({
                quantity: sequeliz.literal(`quantity - ${ quantity }`),
            }, {
                where: {
                    materialId
                },
                transaction: t
            }).then(async () => {
                return pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, { transaction: t }).then(() => {
                    response.status(200).json({
                        success: true,
                        message: 'Thao tác thành công.'
                    });
                    return t.commit();
                }).catch(e => {
                    response.status(200).json({
                        success: true,
                        message: 'Có lỗi xảy ra, chưa thêm được nhật ký chuẩn bị, xin thử lại, cảm ơn!'
                    });
                });
            }).catch(e => {
                t.rollback();
                response.status(200).json({
                    success: false,
                    message: 'Trong kho không đủ số lượng, vui lòng kiểm tra lại, cảm ơn!'
                });
            });
        });
    }

    private getPondPrepareDetails = (request: Request, response: Response, next: NextFunction) => {
        const { pondprepareid } = request.headers;
        this.pondPrepareDetailsServices.models.findAll({
            include: [
                {
                    model: this.materialServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_MATERIAL
                },
                {
                    model: this.pondPrepareServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_POND_PREPARE,
                    where: {
                        pondPrepareId: pondprepareid
                    }
                }
            ]
        }).then((pondPrepareDetail: any) => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepareDetail
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không tìm thấy thông tin, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    // private getById = (request: Request, response: Response, next: NextFunction) => {
    //     const { pondprepareid } = request.headers;
    //     this.pondPrepareDetailsServices.models.findAll({
    //         include: [
    //             {
    //                 model: this.materialServices.models,
    //                 as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_MATERIAL
    //             },
    //             {
    //                 model: this.pondPrepareServices.models,
    //                 as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_POND_PREPARE,
    //                 where: {
    //                     pondPrepareId: pondprepareid
    //                 }
    //             }
    //         ]
    //     }).then((pondPrepareDetail: any) => {
    //         response.status(200).json({
    //             success: true,
    //             message: '',
    //             pondPrepareDetail
    //         });
    //     }).catch(e => {
    //         response.status(200).json({
    //             success: false,
    //             message: 'Không tìm thấy thông tin, vui lòng kiểm tra lại, cảm ơn!'
    //         });
    //     });
    // }

    private updatePondPrepare = async (request: Request, response: Response, next: NextFunction) => {
        const { materialId, pondPrepareId, quantityOld, quantityNew, pondPrepareDetailId } = request.body;
        const quantity = (quantityOld * 1) - (quantityNew * 1);
        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
        pondPrepareDetail.setPondpreparedetails(pondPrepareDetailId, undefined, pondPrepareId, materialId, quantity);
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction().then(async (t: Transaction) => {
            const material = new Material();
            return material.materialServives.models.update({
                quantity: sequeliz.literal(`quantity + ${ quantity }`),
            }, {
                where: {
                    materialId
                },
                transaction: t
            }).then(async () => {
                return pondPrepareDetail.pondPrepareDetailsServices.models.update(pondPrepareDetail, {
                    where: {
                        // pondPrepareDetailId: pondPrepareDetail.getPondPrepareDetailId,
                        // [material.materialServives.Op.any]: {
                        //     createdDate:
                        // }
                    },
                    transaction: t
                }).then(() => {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thành công!'
                    });
                    return t.commit();
                }).catch(e => {
                    response.status(200).json({
                        success: true,
                        message: 'Có lỗi xảy ra, vui lòng thử lại, cảm ơn!'
                    });
                    t.rollback();
                });
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Trong kho không đủ số lượng, vui lòng kiểm tra lại, cảm ơn!'
                });
                t.rollback();
            });
        });
    }
}
