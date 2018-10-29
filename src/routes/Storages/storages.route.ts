import { Storage, Coupon, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, CouponServives, MaterialServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';

/**
 * @apiSuccess {String} type Json Type.
 */
export class StorageRoute extends BaseRoute {
    public static path = '/storages';
    private static instance: StorageRoute;
    private couponServives: CouponServives = new CouponServives();
    private materialServives: MaterialServives = new MaterialServives();
    private sequeliz: Sequelize = DBHelper.sequelize;
    /**
     * @class StorageRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!StorageRoute.instance) {
            StorageRoute.instance = new StorageRoute();
        }
        return StorageRoute.instance.router;
    }

    private init() {
        logger.info('[StorageRoute] Creating storage route.');
        this.router.post('/add', Authentication.isLogin, this.addStorage);
        this.router.get('/gets', Authentication.isLogin, this.getStorages);
        this.router.get('/get/:storageId', Authentication.isLogin, this.getStorageById);
        this.router.put('/update', Authentication.isLogin, this.updateStorage);
    }

    private addStorage = async (request: Request, response: Response, next: NextFunction) => {
        const storage: Storage = new Storage();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const { type, productName, quantity, unit, unitPrice, provider, providerAddress, descriptions, storageId } = request.body;
        /**
         * userId không phải của chủ kho
         */
        storage.setStorages(storageId, uuidv4(), decodeToken.userId, productName, quantity, unit, type, descriptions);
        if(!storageId) {
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                storage.storegeServices.models.create(storage, {
                    transaction: t,
                }).then(async (storage$: any) => {
                    const coupon: Coupon = new Coupon();
                    coupon.setCoupon(null, decodeToken.userId);
                    return new Promise((resolve, reject) => {
                        this.couponServives.models.create(coupon, {
                            transaction: t
                        }).then(cp => {
                            resolve({
                                storage: storage$,
                                coupon: cp
                            });
                        });
                    });
                }).then(async (obj: any) => {
                    const o = obj;
                    const material: Material = new Material();
                    material.setMaterial(null, uuidv4(), obj.coupon.couponId, obj.storage.storageId, provider, providerAddress, quantity, unit, unitPrice);
                    material.materialServives.models.create(material, {
                        transaction: t
                    }).then(async (res) => {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công!'
                        });
                        t.commit();
                    });
                });
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra, vui lòng thử lại!'
                });
            });
        }
    }

    private getStorages = async (request: Request, response: Response, next: NextFunction) => {
        const storage: Storage = new Storage();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        storage.storegeServices.models.findAll({
            where: {
                userId: decodeToken.userId
            }
        }).then((s: any) => {
            response.status(200).json({
                success: true,
                message: '',
                storage: s
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có sản phẩm nào trong kho của mình!'
            });
        });
    }

    private getStorageById = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updateStorage = (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
