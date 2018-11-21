import { PondPrepareDetail, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
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
export class PondPrepareDetailRoute extends BaseRoute {
    public static path = '/PondPrepareDetails';
    private static instance: PondPrepareDetailRoute;
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
        // log message
        logger.info('[PondPrepareDetailRoute] Creating details of preparing pond action route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addDetail);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);

        // log endpoints
        this.logEndpoints(this.router, PondPrepareDetailRoute.path);
    }

    /**
     * Thêm lần chuẩn bị
     * @params [seasonAndPondId, pondprepareName, notes?, materialId]
     */
    private addDetail = async (request: Request, response: Response, next: NextFunction) => {
        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
        const { pondPrepareId, materialId, quantity } = request.body;
        pondPrepareDetail.setPondpreparedetails(undefined, uuidv4(), pondPrepareId, materialId, quantity);
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const material = new Material();
            return material.materialServives.models.update({
                quantity: this.sequeliz.literal(`quantity - ${ quantity }`),
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

    private updatePondPrepare = async (request: Request, response: Response, next: NextFunction) => {
        const { materialId, pondPrepareId, quantityOld, quantityNew, pondPrepareDetailId } = request.body;
        const quantity = (quantityOld * 1) - (quantityNew * 1);
        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
        pondPrepareDetail.setPondpreparedetails(pondPrepareDetailId, undefined, pondPrepareId, materialId, quantity);
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const material = new Material();
            return material.materialServives.models.update({
                quantity: this.sequeliz.literal(`quantity + ${ quantity }`),
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
