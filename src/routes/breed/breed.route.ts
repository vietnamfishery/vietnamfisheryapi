import { Coupon } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { BoughtBreed, Breed, BoughtBreedDetail } from '../../components';
import { logger, UserRolesServices, UserServives, BreedOwnwerServices, BreedServives, SeasonServices, BoughtBreedDetailsServives, CouponServives } from '../../services';
import { ActionAssociateDatabase } from '../../common';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';
import * as uuidv4 from 'uuid/v4';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class BreedRoute extends BaseRoute {
    public static path = '/breeds';
    private static instance: BreedRoute;
    private breedOwnwerServices: BreedOwnwerServices = new BreedOwnwerServices();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private userServives: UserServives = new UserServives();
    private breedServives: BreedServives = new BreedServives();
    private seasonServices: SeasonServices = new SeasonServices();
    private boughtBreedDetailsServives: BoughtBreedDetailsServives = new BoughtBreedDetailsServives();
    private couponServives: CouponServives = new CouponServives();
    /**
     * @class BreedRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!BreedRoute.instance) {
            BreedRoute.instance = new BreedRoute();
        }
        return BreedRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[BreedRoute] Creating breed route.');

        // add route
        this.router.get('/gets', Authentication.isLogin, this.getBreed);
        this.router.post('/add', Authentication.isLogin, this.addBreed);

        // Log path
        this.logEndpoints(this.router, BreedRoute.path);
    }

    addBreed = async (request: Request, response: Response) => {
        const { couponId, itemArr } = request.body;

        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        // this.userServives.models.findAll({
        //     include: [
        //         {
        //             model: this.userRolesServices.models,
        //             as: ActionAssociateDatabase.USER_2_ROLES_USER,
        //             required: false,
        //             where: {
        //                 userId
        //             }
        //         },
        //         {
        //             model: this.userRolesServices.models,
        //             as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
        //             required: false,
        //             where: {
        //                 bossId: userId
        //             }
        //         },
        //         {
        //             model: this.seasonServices.models,
        //             as: ActionAssociateDatabase.USER_2_SEASON,
        //             where: {
        //                 userId,
        //                 status: 0
        //             }
        //         }
        //     ]
        // } as any).then(res => {
        //     if (!res.length) {
        //         return response.status(200).json({
        //             success: false,
        //             message: 'Bạn không có vụ nào đang hoạt động, vui lòng thêm một vụ và quay lại sau.'
        //         });
        //     }
        // }).catch(e => {
        //     return response.status(200).json({
        //         success: false,
        //         message: 'Bạn không có quyền truy cập api này.'
        //     });
        // });

        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const boss: any = await this.breedOwnwerServices.models.findOne({
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
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                });
                t.rollback();
            });
            // Là chủ và phiên nhập mới
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
                        const breed: Breed = new Breed();
                        if (typeof item.breedName === 'string') {
                            breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity, item.unit, item.loopOfBreed);
                            const bre: any = await breed.breedServives.models.create(breed, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                });
                                t.rollback();
                            });
                            if (bre) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(),cp.couponId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                    transaction: t
                                }).catch(async e => {
                                    if (e.message.includes('FailQuantityBoughtBreedDetails')) {
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
                                }
                            }
                        } else {
                            const sUpdate: any = await breed.breedServives.models.update({
                                totalQuantity: this.sequeliz.literal(`totalQuantity + ${item.quantity}`)
                            }, {
                                    where: {
                                        breedId: item.breedName.breedId,
                                        unit: item.breedName.unit
                                    },
                                    returning: true,
                                    transaction: t
                                }).catch(e => {
                                    if (e.message.includes('FailQuantityBreed')) {
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
                            if (sUpdate.length > 0) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), cp.couponId, item.breedName.breedId, item.quantity, item.breedName.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
                                    if (e.message.includes('FailQuantityBoughtBreedDetails')) {
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
                                result.push(boughtBre);
                            } else {
                                t.rollback();
                                response.status(200).json({
                                    success: false,
                                    message: `Có lỗi xảy ra.`,
                                    position: item.position,
                                    couponId: cp.couponId
                                });
                            }
                        }
                    }
                    if (result.length === itemArr.length) {
                        response.status(200).json({
                            success: true,
                            message: 'Thao tác thành công.'
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
            // // Nhân viên và phiên nhập mới
            // else if (!boss && !boughtBreedId) {
            //     boss = await this.userRolesServices.models.findOne({
            //         where: {
            //             userId: deToken.userId,
            //             [this.userRolesServices.Op.and]: {
            //                 roles: 2
            //             }
            //         },
            //         include: [
            //             {
            //                 model: this.userServives.models,
            //                 as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
            //                 include: [
            //                     {
            //                         model: this.breedOwnwerServices.models,
            //                         as: ActionAssociateDatabase.USER_2_OWNER_BREED
            //                     }
            //                 ],
            //                 attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
            //             }
            //         ],
            //         transaction: t
            //     }).catch(e => {
            //         response.status(200).json({
            //             success: false,
            //             message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //         });
            //         t.rollback();
            //     });
            //     if (boss) {
            //         const ss: any = await this.seasonServices.models.findOne({
            //             where: {
            //                 userId: deToken.userId,
            //                 status: 0
            //             }
            //         }).catch(e => {
            //             response.status(200).json({
            //                 success: false,
            //                 message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //             });
            //             t.rollback();
            //         });
            //         if (!ss) {
            //             response.status(200).json({
            //                 success: false,
            //                 message: 'Hiện tại bạn chưa có vụ nào được kích hoạt vui lòng thêm một vụ.'
            //             });
            //             t.rollback();
            //         } else {
            //             const boughtBreed: BoughtBreed = new BoughtBreed();
            //             boughtBreed.setBoughtBreedUUId = uuidv4();
            //             boughtBreed.setUserId = deToken.userId;
            //             boughtBreed.setSeasonId = ss.seasonId;
            //             const bb: any = await boughtBreed.boughtBreedServives.models.create(boughtBreed, {
            //                 transaction: t
            //             });
            //             if (bb) {
            //                 const result: any[] = [];
            //                 for (const item of itemArr) {
            //                     const breed: Breed = new Breed();
            //                     if (typeof item.breedName === 'string') {
            //                         breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity, item.unit, item.loopOfBreed);
            //                         const bre: any = await breed.breedServives.models.create(breed, {
            //                             transaction: t
            //                         }).catch(e => {
            //                             response.status(200).json({
            //                                 success: false,
            //                                 message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                             });
            //                             t.rollback();
            //                         });
            //                         if (bre) {
            //                             const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
            //                             boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
            //                             const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
            //                                 transaction: t
            //                             }).catch(async e => {
            //                                 response.status(200).json({
            //                                     success: false,
            //                                     message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
            //                                     couponId: bb.boughtBreedId
            //                                 });
            //                                 t.rollback();
            //                             });
            //                             if (mat) {
            //                                 result.push(mat);
            //                             }
            //                         }
            //                     } else {
            //                         const sUpdate: any = await breed.breedServives.models.update({
            //                             totalQuantity: this.sequeliz.literal(`totalQuantity + ${item.quantity}`)
            //                         }, {
            //                                 where: {
            //                                     breedId: item.breedName.breedId
            //                                 },
            //                                 transaction: t
            //                             }).catch(e => {
            //                                 response.status(200).json({
            //                                     success: false,
            //                                     message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                                 });
            //                                 t.rollback();
            //                             });
            //                         if (sUpdate.length > 0) {
            //                             const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
            //                             boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
            //                             const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
            //                                 response.status(200).json({
            //                                     success: false,
            //                                     message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                                 });
            //                                 t.rollback();
            //                             });
            //                             result.push(boughtBre);
            //                         } else {
            //                             t.rollback();
            //                             response.status(200).json({
            //                                 success: false,
            //                                 message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
            //                                 position: item.position,
            //                                 couponId: bb.boughtBreedId
            //                             });
            //                         }
            //                     }
            //                 }
            //                 if (result.length === itemArr.length) {
            //                     response.status(200).json({
            //                         success: true,
            //                         message: 'Thêm thành công, vui lòng đợi...'
            //                     });
            //                     t.commit();
            //                 } else {
            //                     response.status(200).json({
            //                         success: false,
            //                         message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
            //                         couponId: bb.boughtBreedId
            //                     });
            //                     t.rollback();
            //                 }
            //             }
            //         }
            //     } else {
            //         response.status(200).json({
            //             success: false,
            //             message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
            //         });
            //     }
            // }
            // // Nhân viên và phiên nhập cũ
            // else if (!boss && boughtBreedId) {
            //     boss = await this.userRolesServices.models.findOne({
            //         where: {
            //             userId: deToken.userId,
            //             [this.userRolesServices.Op.and]: {
            //                 roles: 2
            //             }
            //         },
            //         include: [
            //             {
            //                 model: this.userServives.models,
            //                 as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
            //                 include: [
            //                     {
            //                         model: this.breedOwnwerServices.models,
            //                         as: ActionAssociateDatabase.USER_2_OWNER_BREED
            //                     }
            //                 ],
            //                 attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
            //             }
            //         ],
            //         transaction: t
            //     }).catch(e => {
            //         response.status(200).json({
            //             success: false,
            //             message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //         });
            //         t.rollback();
            //     });
            //     if (boss) {
            //         const result: any[] = [];
            //         for (const item of itemArr) {
            //             const breed: Breed = new Breed();
            //             if (typeof item.breedName === 'string') {
            //                 breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity, item.unit, item.loopOfBreed);
            //                 const bre: any = await breed.breedServives.models.create(breed, {
            //                     transaction: t
            //                 }).catch(e => {
            //                     response.status(200).json({
            //                         success: false,
            //                         message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                     });
            //                     t.rollback();
            //                 });
            //                 if (bre) {
            //                     const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
            //                     boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
            //                     const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
            //                         transaction: t
            //                     }).catch(async e => {
            //                         response.status(200).json({
            //                             success: false,
            //                             message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
            //                             position: item.position,
            //                             boughtBreedId
            //                         });
            //                         t.rollback();
            //                     });
            //                     if (mat) {
            //                         result.push(mat);
            //                     }
            //                 }
            //             } else {
            //                 const sUpdate: any = await breed.breedServives.models.update({
            //                     totalQuantity: this.sequeliz.literal(`totalQuantity + ${item.quantity}`)
            //                 }, {
            //                         where: {
            //                             breedId: item.breedName.breedId
            //                         },
            //                         transaction: t
            //                     }).catch(e => {
            //                         response.status(200).json({
            //                             success: false,
            //                             message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                         });
            //                         t.rollback();
            //                     });
            //                 if (sUpdate.length > 0) {
            //                     const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
            //                     boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
            //                     const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
            //                         response.status(200).json({
            //                             success: false,
            //                             message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            //                         });
            //                         t.rollback();
            //                     });
            //                     result.push(boughtBre);
            //                 } else {
            //                     t.rollback();
            //                     response.status(200).json({
            //                         success: false,
            //                         message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
            //                         position: item.position,
            //                         boughtBreedId
            //                     });
            //                 }
            //             }
            //         }
            //         if (result.length === itemArr.length) {
            //             response.status(200).json({
            //                 success: true,
            //                 message: 'Thêm thành công, vui lòng đợi...'
            //             });
            //             t.commit();
            //         } else {
            //             response.status(200).json({
            //                 success: false,
            //                 message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
            //                 boughtBreedId
            //             });
            //             t.rollback();
            //         }
            //     } else {
            //         response.status(200).json({
            //             success: false,
            //             message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
            //         });
            //     }
            // }
        });
    }

    getBreed = async (request: Request, response: Response) => {
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy === null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        const query: FindOptions<any> = {
            include: [
                {
                    model: this.breedOwnwerServices.models,
                    as: ActionAssociateDatabase.BREED_2_OWNER_BREED,
                    include: [
                        {
                            model: this.userServives.models,
                            as: ActionAssociateDatabase.OWNER_BREED_TO_USER,
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
                    model: this.boughtBreedDetailsServives.models,
                    as: ActionAssociateDatabase.BREED_2_BOUGHT_BREED_DETAIL,
                    include: [
                        {
                            model: this.couponServives.models,
                            as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_COUPON
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
                        '$owner->user->employees.roles$': 2
                    }
                ]
            } as any
        };
        this.breedServives.models.findAll(query).then((res: any) => {
            if (!res.length) {
                return response.status(200).json({
                    success: false,
                    message: 'Hiện tại trong kho không có giống nào.',
                    breeds: res
                });
            }
            return response.status(200).json({
                success: true,
                message: '',
                breeds: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra!'
            });
        });
    }
}
