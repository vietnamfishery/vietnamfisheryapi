import { Storage, Coupon, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, StoregeServices, StoregeOwnwerServices, UserRolesServices, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';

/**
 * @apiSuccess {String} type Json Type.
 */
export class StorageRoute extends BaseRoute {
    public static path = '/storages';
    private static instance: StorageRoute;
    private storegeOwnwerServices: StoregeOwnwerServices = new StoregeOwnwerServices();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private userServives: UserServives = new UserServives();
    private storegeServices: StoregeServices = new StoregeServices();
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
        // log message
        logger.info('[StorageRoute] Creating storage route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addStorage);
        this.router.get('/gets', Authentication.isLogin, this.getStorages);
        this.router.get('/get/:storageId', Authentication.isLogin, this.getStorageById);
        this.router.put('/update', Authentication.isLogin, this.updateStorage);

        // log endpoints
        this.logEndpoints(this.router, StorageRoute.path);
    }

    /**
     * Phân tích token nếu là chủ thì thêm thằng vào kho,
     * nếu không phải chủ phải join với bảng phân quyền để tìm lấy id chủ
     *
     * tiếp theo...
     *
     * Nhận lên mã phiều nhập, nếu là một phiên nhập mới (coupondId từ client = 0)
     * thì tạo phiếu nhập mới và tiến hành lập mảng các item và thêm chúng vào DB
     * trong quá trình thêm ghi nhận lại kết quả và trả về các vị trí lỗi(nếu có) của mảng
     * để client giữ lại những form lỗi yêu cầu người dùng nhập lại
     * lúc gửi cùng gửi kèm coupondId để khi người dùng submit lại thì thêm lại vào phiếu cũ
     */
    private addStorage = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { couponId, itemArr } = request.body;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            let boss: any = await this.storegeOwnwerServices.models.findOne({
                where: {
                    userId: deToken.userId
                },
                transaction: t
            });
            // Là chủ và phiên nhập mới
            if (boss && !couponId) {
                const coupon: Coupon = new Coupon();
                coupon.setUserId = deToken.userId;
                const cp: any = await coupon.couponServives.models.create(coupon, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                });
                if (cp) {
                    const result: any[] = [];
                    for (const item of itemArr) {
                        const storage: Storage = new Storage();
                        if (typeof item.product === 'string')/* Là vật phẩm mới */ {
                            storage.setStorages(null, uuidv4(), boss.storageOwnerId, item.product, item.quantity, item.unit, item.type, item.descriptions);
                            const sto: any = await storage.storegeServices.models.create(storage, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            });
                            if (sto) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), cp.couponId, sto.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat: any = await material.materialServives.models.create(material, {
                                    transaction: t
                                }).catch(async e => {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                        position: item.position,
                                        couponId: cp.couponId
                                    });
                                    t.rollback();
                                });
                                if (mat) {
                                    result.push(mat);
                                }
                            }
                        } else/** Vật phẩm cũ */ {
                            const sUpdate: any = await storage.storegeServices.models.update({
                                quantityStorages: this.sequeliz.literal(`quantityStorages + ${item.quantity}`)
                            }, {
                                    where: {
                                        storageId: item.product.storageId
                                    },
                                    transaction: t
                                });
                            if (sUpdate.length > 0) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), cp.couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                    });
                                    t.rollback();
                                });
                                result.push(mat);
                            } else {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                    position: item.position,
                                    couponId: cp.couponId
                                });
                                t.rollback();
                            }
                        }
                    }
                    if (result.length === itemArr.length) {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công, vui lòng đợi...'
                        });
                        t.commit();
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                            couponId: cp.couponId
                        });
                        t.rollback();
                    }
                }
            }
            // Là chủ và phiên nhập cũ
            else if (boss && couponId) {
                const result: any[] = [];
                for (const item of itemArr) {
                    const storage: Storage = new Storage();
                    if (typeof item.product === 'string') {
                        storage.setStorages(null, uuidv4(), boss.storageOwnerId, item.product, item.quantity, item.unit, item.type, item.descriptions);
                        const sto: any = await storage.storegeServices.models.create(storage, {
                            transaction: t
                        }).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                            });
                            t.rollback();
                        });
                        if (sto) {
                            const material: Material = new Material();
                            material.setMaterial(null, uuidv4(), couponId, sto.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                            const mat: any = await material.materialServives.models.create(material, {
                                transaction: t
                            }).catch(async e => {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                    position: item.position,
                                    couponId
                                });
                                t.rollback();
                            });
                            if (mat) {
                                result.push(mat);
                            }
                        }
                    } else {
                        const sUpdate: any = await storage.storegeServices.models.update({
                            quantityStorages: this.sequeliz.literal(`quantityStorages + ${item.quantity}`)
                        }, {
                                where: {
                                    storageId: item.product.storageId
                                },
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            });
                        if (sUpdate.length > 0) {
                            const material: Material = new Material();
                            material.setMaterial(null, uuidv4(), couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                            const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            });
                            result.push(mat);
                        } else {
                            response.status(200).json({
                                success: false,
                                message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                position: item.position,
                                couponId
                            });
                            t.rollback();
                        }
                    }
                }
                if (result.length === itemArr.length) {
                    response.status(200).json({
                        success: true,
                        message: 'Thêm thành công, vui lòng đợi...'
                    });
                    t.commit();
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                        couponId
                    });
                    t.rollback();
                }
            }
            // Nhân viên và phiên nhập mới
            else if (!boss && !couponId) {
                boss = await this.userRolesServices.models.findOne({
                    where: {
                        userId: deToken.userId,
                        [this.userRolesServices.Op.and]: {
                            roles: 2
                        }
                    },
                    include: [
                        {
                            model: this.userServives.models,
                            as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
                            include: [
                                {
                                    model: this.storegeOwnwerServices.models,
                                    as: ActionAssociateDatabase.USER_2_OWNER_STORAGE
                                }
                            ]
                        }
                    ],
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                });
                if (boss) {
                    const coupon: Coupon = new Coupon();
                    coupon.setUserId = deToken.userId;
                    const cp: any = await coupon.couponServives.models.create(coupon, {
                        transaction: t
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                        });
                        t.rollback();
                    });
                    if (cp) {
                        const result: any[] = [];
                        for (const item of itemArr) {
                            const storage: Storage = new Storage();
                            if (typeof item.product === 'string') {
                                storage.setStorages(null, uuidv4(), boss.boss.user.storageOwnerId, item.product, item.quantity, item.unit, item.type, item.descriptions);
                                const sto: any = await storage.storegeServices.models.create(storage, {
                                    transaction: t
                                }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                    });
                                    t.rollback();
                                });
                                if (sto) {
                                    const material: Material = new Material();
                                    material.setMaterial(null, uuidv4(), cp.couponId, sto.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                    const mat: any = await material.materialServives.models.create(material, {
                                        transaction: t
                                    }).catch(async e => {
                                        t.rollback();
                                        response.status(200).json({
                                            success: false,
                                            message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                            position: item.position,
                                            couponId: cp.couponId
                                        });
                                    });
                                    if (mat) {
                                        result.push(mat);
                                    }
                                }
                            } else {
                                const sUpdate: any = await storage.storegeServices.models.update({
                                    quantityStorages: this.sequeliz.literal(`quantityStorages + ${item.quantity}`)
                                }, {
                                        where: {
                                            storageId: item.product.storageId
                                        },
                                        transaction: t
                                    }).catch(e => {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                        });
                                        t.rollback();
                                    });
                                if (sUpdate.length > 0) {
                                    const material: Material = new Material();
                                    material.setMaterial(null, uuidv4(), cp.couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                    const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                        });
                                        t.rollback();
                                    });
                                    result.push(mat);
                                } else {
                                    t.rollback();
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                        position: item.position,
                                        couponId: cp.couponId
                                    });
                                }
                            }
                        }
                        if (result.length === itemArr.length) {
                            response.status(200).json({
                                success: true,
                                message: 'Thêm thành công, vui lòng đợi...'
                            });
                            t.commit();
                        } else {
                            response.status(200).json({
                                success: false,
                                message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                                couponId: cp.couponId
                            });
                            t.rollback();
                        }
                    }
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
                    });
                }
            }
            // Nhân viên và phiên nhập củ
            else if (!boss && couponId) {
                boss = await this.userRolesServices.models.findOne({
                    where: {
                        userId: deToken.userId,
                        [this.userRolesServices.Op.and]: {
                            roles: 2
                        }
                    },
                    include: [
                        {
                            model: this.userServives.models,
                            as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
                            include: [
                                {
                                    model: this.storegeOwnwerServices.models,
                                    as: ActionAssociateDatabase.OWNER_TO_USER
                                }
                            ]
                        }
                    ],
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                });
                if (boss) {
                    const result: any[] = [];
                    for (const item of itemArr) {
                        const storage: Storage = new Storage();
                        if (typeof item.product === 'string') {
                            storage.setStorages(null, uuidv4(), boss.boss.user.storageOwnerId, item.product, item.quantity, item.unit, item.type, item.descriptions);
                            const sto: any = await storage.storegeServices.models.create(storage, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            });
                            if (sto) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), couponId, sto.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat: any = await material.materialServives.models.create(material, {
                                    transaction: t
                                }).catch(async e => {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                        position: item.position,
                                        couponId
                                    });
                                    t.rollback();
                                });
                                if (mat) {
                                    result.push(mat);
                                }
                            }
                        } else {
                            const sUpdate: any = await storage.storegeServices.models.update({
                                quantityStorages: this.sequeliz.literal(`quantityStorages + ${item.quantity}`)
                            }, {
                                    where: {
                                        storageId: item.product.storageId
                                    },
                                    transaction: t
                                }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                    });
                                    t.rollback();
                                });
                            if (sUpdate.length > 0) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                    });
                                    t.rollback();
                                });
                                result.push(mat);
                            } else {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position }.`,
                                    position: item.position,
                                    couponId
                                });
                                t.rollback();
                            }
                        }
                    }
                    if (result.length === itemArr.length) {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công, vui lòng đợi...'
                        });
                        t.commit();
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                            couponId
                        });
                        t.rollback();
                    }
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
                    });
                }
            }
        });
    }

    private getStorages = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { type } = request.headers;
        this.userRolesServices.models.findOne(({
            where: {
                [this.userRolesServices.Op.or]: [
                    {
                        userId: deToken.userId
                    },
                    {
                        bossId: deToken.userId
                    }
                ]
            },
            attributes: ['bossId'],
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
                    attributes: ['userId'],
                    include: [
                        {
                            model: this.storegeOwnwerServices.models,
                            as: ActionAssociateDatabase.USER_2_OWNER_STORAGE,
                            include: [
                                {
                                    model: this.storegeServices.models,
                                    as: ActionAssociateDatabase.OWNER_TO_STORAGE,
                                    where: {
                                        type: (type as any) - 0
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        } as any)).then((s: any) => {
            response.status(200).json({
                success: true,
                message: '',
                storages: s.employees.user.storages
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có vật phẩm nào trong kho của mình!'
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
