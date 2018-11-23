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
        const { couponId, itemArr } = request.body;

        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        this.userRolesServices.models.findAll({
            where: {
                userId,
                roles: 2
            }
        }).then(res => {
            if(!res) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có quyền truy cập api này.'
                });
            }
        }).catch(e => {
            return response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập api này.'
            });
        });

        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const boss: any = await this.storegeOwnwerServices.models.findOne({
                where: {
                    userId: isBoss ? userId : ownerId
                },
                transaction: t
            });
            // Là chủ và phiên nhập mới
            if (boss) {
                const coupon: Coupon = new Coupon();
                coupon.setUserId = userId;
                const cp: any = await coupon.couponServives.models.create(coupon, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Lỗi xác thực người dùng, vui lòng liên hệ nhà cung cấp để được hỗ trợ.'
                    });
                    t.rollback();
                });
                if (cp) {
                    const result: any[] = [];
                    for (const item of itemArr) {
                        const storage: Storage = new Storage();
                        if (typeof item.product === 'string' )/* Là vật phẩm mới */ {
                            storage.setStorages(null, uuidv4(), boss.storageOwnerId, item.product, item.quantity, item.unit, item.type, item.descriptions);
                            const sto: any = await storage.storegeServices.models.create(storage, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.`,
                                    position: item.position,
                                    couponId: cp.couponId
                                });
                                t.rollback();
                            });
                            if (sto) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), cp.couponId, sto.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat: any = await material.materialServives.models.create(material, {
                                    transaction: t
                                }).catch(async e => {
                                    if (e.message === 'FailWithInsertQuantityOfMaterials') {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Lỗi nhập liệu số lượng vui lòng kiểm tra lại.',
                                            position: item.position,
                                            couponId: cp.couponId
                                        });
                                    } else {
                                        response.status(200).json({
                                            success: false,
                                            message: `Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.`,
                                            position: item.position,
                                            couponId: cp.couponId
                                        });
                                    }
                                    t.rollback();
                                });
                                if (mat) {
                                    result.push(mat);
                                } else {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.`,
                                        position: item.position,
                                        couponId: cp.couponId
                                    });
                                    t.rollback();
                                }
                            } else {
                                response.status(200).json({
                                    success: false,
                                    message: 'Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            }
                        } else/** Vật phẩm cũ */ {
                            const sUpdate: any = await storage.storegeServices.models.update({
                                quantityStorages: this.sequeliz.literal(`quantityStorages + ${item.quantity}`)
                            }, {
                                    where: {
                                        storageId: item.product.storageId,
                                        type: item.type
                                    },
                                    transaction: t
                                }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Lỗi nhập liệu số lượng hay đơn vị vui lòng kiểm tra lại.'
                                    });
                                });
                            if (sUpdate.length > 0) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), cp.couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.unit, item.unitPrice);
                                const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                    if (e.message === 'FailWithInsertQuantityOfMaterials') {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Lỗi nhập liệu số lượng vui lòng kiểm tra lại.',
                                            position: item.position,
                                            couponId: cp.couponId
                                        });
                                    } else {
                                        response.status(200).json({
                                            success: false,
                                            message: `Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.`,
                                            position: item.position,
                                            couponId: cp.couponId
                                        });
                                    }
                                    t.rollback();
                                });
                                if(mat) {
                                    result.push(mat);
                                } else {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, vui lòng kiểm tra và thử lại sau.`,
                                        position: item.position,
                                        couponId: cp.couponId
                                    });
                                    t.rollback();
                                }
                            } else {
                                response.status(200).json({
                                    success: false,
                                    message: `Lỗi nhập liệu số lượng vui lòng kiểm tra lại.`,
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
                            message: 'Thêm thành công.'
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
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Thực hiện không thành công, vui lòng thử lại sau.'
                    });
                    t.rollback();
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
                        userId: deToken.userId,
                        roles: 2
                    },
                    {
                        bossId: deToken.userId
                    }
                ],
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
            if(!s) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có vật phẩm nào trong kho của mình!'
                });
            }
            return response.status(200).json({
                success: true,
                message: '',
                storages: s.employees.user.storages
            });
        }).catch(e => {
            return response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
            });
        });
    }

    private getStorageById = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updateStorage = (request: Request, response: Response, next: NextFunction) => {
        const { storageUUId } = request.body;
    }
}
