import { Storage, Coupon, Material } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, StoregeServices, StoregeOwnwerServices, UserRolesServices, UserServives, SeasonServices, CouponServives, MaterialServives, BoughtBreedDetailsServives, BreedServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';

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
    private seasonServices: SeasonServices = new SeasonServices();
    private couponServives: CouponServives = new CouponServives();
    private materialServives: MaterialServives = new MaterialServives();
    private boughtBreedDetailsServives: BoughtBreedDetailsServives = new BoughtBreedDetailsServives();
    private breedServives: BreedServives = new BreedServives();
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
        this.router.post('/coupons/gets', Authentication.isLogin, this.getCoupon);

        // log endpoints
        this.logEndpoints(this.router, StorageRoute.path);
    }

    private addStorage = async (request: Request, response: Response, next: NextFunction) => {
        const { couponId, itemArr } = request.body;

        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        this.userServives.models.findAll({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                    required: false,
                    where: {
                        [this.sequeliz.Op.or]: [
                            {
                                userId
                            },
                            {
                                bossId: userId
                            },
                        ],
                        roles: 2
                    } as any
                },
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.USER_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    }
                }
            ]
        } as any).then(res => {
            if (!res.length) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có vụ nào đang hoạt động, vui lòng thêm một vụ và quay lại sau.'
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
                include: [
                    {
                        model: this.userServives.models,
                        as: ActionAssociateDatabase.OWNER_TO_USER,
                        include: [
                            {
                                model: this.seasonServices.models,
                                as: ActionAssociateDatabase.USER_2_SEASON,
                                where: {
                                    userId: ownerId,
                                    status: 0
                                }
                            },
                            {
                                model: this.userRolesServices.models,
                                as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                                required: false,
                                where: {
                                    [this.sequeliz.Op.or]: [
                                        {
                                            userId
                                        },
                                        {
                                            bossId: userId
                                        },
                                    ],
                                    roles: 2
                                } as any
                            }
                        ],
                        attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
                    }
                ],
                where: {
                    userId: ownerId
                },
                transaction: t
            });
            if (boss && boss.user.seasons.length) {
                const coupon: Coupon = new Coupon();
                coupon.setUserId = userId;
                coupon.setSeasonId = boss.user.seasons[0].seasonId;
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
                        if (typeof item.product === 'string')/* Là vật phẩm mới */ {
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
                                    if (e.message.includes('FailWithInsertQuantityOfMaterials')) {
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
                                        unit: item.product.unit
                                    },
                                    transaction: t
                                }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Lỗi nhập liệu vui lòng kiểm tra lại.'
                                    });
                                    t.rollback();
                                });
                            if (sUpdate.length > 0) {
                                const material: Material = new Material();
                                material.setMaterial(null, uuidv4(), cp.couponId, item.product.storageId, item.provider, item.providerAddress, item.quantity, item.product.unit, item.unitPrice);
                                const mat = await material.materialServives.models.create(material, { transaction: t }).catch(e => {
                                    if (e.message.includes('FailWithInsertQuantityOfMaterials')) {
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
        const { type } = request.headers;

        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy === null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        this.storegeServices.models.findAll({
            include: [
                {
                    model: this.storegeOwnwerServices.models,
                    as: ActionAssociateDatabase.STORAGE_2_OWNER,
                    include: [
                        {
                            model: this.userServives.models,
                            as: ActionAssociateDatabase.OWNER_TO_USER,
                            include: [
                                {
                                    model: this.userRolesServices.models,
                                    as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                                    required: false
                                }
                            ],
                            attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
                        }
                    ]
                },
                {
                    model: this.materialServives.models,
                    as: ActionAssociateDatabase.STORAGE_2_MATERIAL,
                    include: [
                        {
                            model: this.couponServives.models,
                            as: ActionAssociateDatabase.MATERIAL_2_COUPON
                        }
                    ]
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        '$owner.userId$': userId,
                    },
                    {
                        '$owner->user->employees.userId$': userId,
                        '$owner->user->employees.roles$': 2
                    },
                    {
                        '$owner->user->employees.userId$': userId,
                        '$owner->user->employees.roles$': 1
                    }
                ],
                type: (type as any) - 0
            } as any
        }).then((s: any) => {
            if (!s.length) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có vật phẩm nào trong kho của mình!',
                    storages: s
                });
            }
            return response.status(200).json({
                success: true,
                message: '',
                storages: s
            });
        }).catch(e => {
            e;
            return response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
            });
        });
    }

    private getStorageById =  async (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updateStorage = async (request: Request, response: Response, next: NextFunction) => {
        const { storageUUId } = request.body;
    }

    /**
     * @method POST
     */
    private getCoupon = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId } = request.body;
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const query: FindOptions<any> = {
            include: [
                {
                    model: this.materialServives.models,
                    as: ActionAssociateDatabase.COUPON_2_MATERIAL,
                    required: false,
                    include: [
                        {
                            model: this.storegeServices.models,
                            as: ActionAssociateDatabase.MATERIAL_2_STORAGE
                        }
                    ]
                },
                {
                    model: this.boughtBreedDetailsServives.models,
                    as: ActionAssociateDatabase.COUPON_2_BOUGHT_BREED_DETAILS,
                    required: false,
                    include: [
                        {
                            model: this.breedServives.models,
                            as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BREED
                        }
                    ]
                }
            ]
        };
        const withSeason: Array<{}> = [];
        if (seasonId) {
            withSeason.push({
                model: this.userServives.models,
                as: ActionAssociateDatabase.COUPON_2_USER,
                include: [
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.USER_2_SEASON,
                        where: {
                            seasonId,
                            userId: ownerId
                        }
                    },
                    {
                        model: this.userRolesServices.models,
                        as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                        where: {
                            [this.sequeliz.Op.or]: [
                                {
                                    bossId: userId
                                },
                                {
                                    userId,
                                    roles: 2
                                }
                            ]
                        }
                    }
                ],
                attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
            });
        } else {
            withSeason.push({
                model: this.userServives.models,
                as: ActionAssociateDatabase.COUPON_2_USER,
                include: [
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.USER_2_SEASON,
                        where: {
                            userId: ownerId,
                            status: 0
                        }
                    },
                    {
                        model: this.userRolesServices.models,
                        as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                        where: {
                            [this.sequeliz.Op.or]: [
                                {
                                    bossId: userId
                                },
                                {
                                    userId,
                                    roles: 2
                                }
                            ]
                        }
                    }
                ],
                attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
            });
        }
        query.include = [
            ...query.include,
            ...withSeason
        ];
        this.couponServives.models.findAll(query).then(res => {
            if (!res.length) {
                return response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy bất kỳ lịch sử nhập kho nào.',
                    coupons: res
                });
            }
            return response.status(200).json({
                success: true,
                message: '',
                coupons: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                e
            });
        });
    }
}
