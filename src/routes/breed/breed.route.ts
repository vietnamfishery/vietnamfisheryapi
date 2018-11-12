import { NextFunction, Request, Response } from 'express';
import { BoughtBreed, Breed, BoughtBreedDetail } from '../../components';
import { logger, UserRolesServices, UserServives, BreedOwnwerServices, BreedServives, SeasonServices } from '../../services';
import { ActionAssociateDatabase } from '../../common';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
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
    /**
     * @class BreedRoute
     * @constructor
     */
    private constructor() {
        super();
        // this.get = this.get.bind(this);
        this.init();
    }

    static get router() {
        if (!BreedRoute.instance) {
            BreedRoute.instance = new BreedRoute();
        }
        return BreedRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[BreedRoute] Creating breed route.');

        // add index page route
        this.router.post('/add', Authentication.isLogin, this.addBreed);
        this.router.get('/gets', Authentication.isLogin, this.getBreed);
    }

    addBreed = async (request: Request, response: Response) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { boughtBreedId, itemArr } = request.body;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            let boss: any = await this.breedOwnwerServices.models.findOne({
                where: {
                    userId: deToken.userId
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
            if (boss && !boughtBreedId) {
                const ss: any = await this.seasonServices.models.findOne({
                    where: {
                        userId: deToken.userId,
                        status: 0
                    }
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                });
                if(!ss) {
                    response.status(200).json({
                        success: false,
                        message: 'Hiện tại bạn chưa có vụ nào được kích hoạt vui lòng thêm một vụ.'
                    });
                    t.rollback();
                } else {
                    const boughtBreed: BoughtBreed = new BoughtBreed();
                    boughtBreed.setBoughtBreedUUId = uuidv4();
                    boughtBreed.setUserId = deToken.userId;
                    boughtBreed.setSeasonId = ss.seasonId;
                    const bb: any = await boughtBreed.boughtBreedServives.models.create(boughtBreed, {
                        transaction: t
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                        });
                        t.rollback();
                    });
                    if (bb) {
                        const result: any[] = [];
                        for (const item of itemArr) {
                            const breed: Breed = new Breed();
                            if (typeof item.breedName === 'string') {
                                breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity,item.unit, item.loopOfBreed);
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
                                    boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                    const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                        transaction: t
                                    }).catch(async e => {
                                        response.status(200).json({
                                            success: false,
                                            message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
                                            couponId: bb.boughtBreedId
                                        });
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
                                            breedId: item.breedName.breedId
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
                                    const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                    boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                    const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                        });
                                        t.rollback();
                                    });
                                    result.push(boughtBre);
                                } else {
                                    t.rollback();
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                        position: item.position,
                                        couponId: bb.boughtBreedId
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
                                couponId: bb.boughtBreedId
                            });
                            t.rollback();
                        }
                    }
                }
            }
            // Là chủ và phiên nhập cũ
            else if (boss && boughtBreedId) {
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
                            boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                            const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                transaction: t
                            }).catch(async e => {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                    boughtBreedId
                                });
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
                                    breedId: item.breedName.breedId
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
                            const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                            boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                            const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t });
                            result.push(boughtBre);
                        } else {
                            t.rollback();
                            response.status(200).json({
                                success: false,
                                message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                position: item.position,
                                boughtBreedId
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
                        boughtBreedId
                    });
                    t.rollback();
                }
            }
            // Nhân viên và phiên nhập mới
            else if (!boss && !boughtBreedId) {
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
                                    model: this.breedOwnwerServices.models,
                                    as: ActionAssociateDatabase.USER_2_OWNER_BREED
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
                    const ss: any = await this.seasonServices.models.findOne({
                        where: {
                            userId: deToken.userId,
                            status: 0
                        }
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                        });
                        t.rollback();
                    });
                    if(!ss) {
                        response.status(200).json({
                            success: false,
                            message: 'Hiện tại bạn chưa có vụ nào được kích hoạt vui lòng thêm một vụ.'
                        });
                        t.rollback();
                    } else {
                        const boughtBreed: BoughtBreed = new BoughtBreed();
                        boughtBreed.setBoughtBreedUUId = uuidv4();
                        boughtBreed.setUserId = deToken.userId;
                        boughtBreed.setSeasonId = ss.seasonId;
                        const bb: any = await boughtBreed.boughtBreedServives.models.create(boughtBreed, {
                            transaction: t
                        });
                        if (bb) {
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
                                        boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                        const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                            transaction: t
                                        }).catch(async e => {
                                            response.status(200).json({
                                                success: false,
                                                message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                                couponId: bb.boughtBreedId
                                            });
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
                                                breedId: item.breedName.breedId
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
                                        const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                        boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                        const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
                                            response.status(200).json({
                                                success: false,
                                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                            });
                                            t.rollback();
                                        });
                                        result.push(boughtBre);
                                    } else {
                                        t.rollback();
                                        response.status(200).json({
                                            success: false,
                                            message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1}.`,
                                            position: item.position,
                                            couponId: bb.boughtBreedId
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
                                    couponId: bb.boughtBreedId
                                });
                                t.rollback();
                            }
                        }
                    }
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
                    });
                }
            }
            // Nhân viên và phiên nhập cũ
            else if (!boss && boughtBreedId) {
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
                                    model: this.breedOwnwerServices.models,
                                    as: ActionAssociateDatabase.USER_2_OWNER_BREED
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
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                    transaction: t
                                }).catch(async e => {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                        position: item.position,
                                        boughtBreedId
                                    });
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
                                        breedId: item.breedName.breedId
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
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.soldAddress, item.testingAgency, item.testingAgency);
                                const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t }).catch(e => {
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                                    });
                                    t.rollback();
                                });
                                result.push(boughtBre);
                            } else {
                                t.rollback();
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${ item.position + 1 }.`,
                                    position: item.position,
                                    boughtBreedId
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
                            boughtBreedId
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

    getBreed = (request: Request, response: Response) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const query: any = {
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
                            model: this.breedOwnwerServices.models,
                            as: ActionAssociateDatabase.USER_2_OWNER_BREED,
                            include: [
                                {
                                    model: this.breedServives.models,
                                    as: ActionAssociateDatabase.OWNER_BREED_TO_BREED
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        this.userRolesServices.models.findOne(query).then((res: any) => {
            response.status(200).json({
                success: true,
                message: '',
                breeds: res.employees.ownerBreed.breeds
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có vật phẩm nào trong kho của mình!'
            });
        });
    }
}
