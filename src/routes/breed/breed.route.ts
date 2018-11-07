import { NextFunction, Request, Response } from 'express';
import { BoughtBreed, Breed, BoughtBreedDetail } from '../../components';
import { logger, UserRolesServices, UserServives, BreedOwnwerServices, BreedServives } from '../../services';
import { ActionAssociateDatabase } from '../../common';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';
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
    private sequeliz: Sequelize = DBHelper.sequelize;
    private breedOwnwerServices: BreedOwnwerServices = new BreedOwnwerServices();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private userServives: UserServives = new UserServives();
    private breedServives: BreedServives = new BreedServives();
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
        const decodeToken: any = Authentication.detoken(token);
        const { boughtBreedId, itemArr } = request.body;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            let boss: any = await this.breedOwnwerServices.models.findOne({
                where: {
                    userId: decodeToken.userId
                },
                transaction: t
            });
            // Là chủ và phiên nhập mới
            if (boss && !boughtBreedId) {
                const boughtBreed: BoughtBreed = new BoughtBreed();
                boughtBreed.setUserId = decodeToken.userId;
                const bb: any = await boughtBreed.boughtBreedServives.models.create(boughtBreed, {
                    transaction: t
                });
                if (bb) {
                    const result: any[] = [];
                    for (const item of itemArr) {
                        const breed: Breed = new Breed();
                        if (typeof item.breedName === 'string') {
                            breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity);
                            const bre: any = await breed.breedServives.models.create(breed, {
                                transaction: t
                            });
                            if (bre) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
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
                                });
                            if (sUpdate.length > 0) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                                const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t });
                                result.push(boughtBre);
                            } else {
                                t.rollback();
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position}.`,
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
            // Là chủ và phiên nhập củ
            else if (boss && boughtBreedId) {
                const result: any[] = [];
                for (const item of itemArr) {
                    const breed: Breed = new Breed();
                    if (typeof item.breedName === 'string') {
                        breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity);
                        const bre: any = await breed.breedServives.models.create(breed, {
                            transaction: t
                        });
                        if (bre) {
                            const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                            boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                            const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                transaction: t
                            }).catch(async e => {
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
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
                            });
                        if (sUpdate.length > 0) {
                            const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                            boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                            const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t });
                            result.push(boughtBre);
                        } else {
                            t.rollback();
                            response.status(200).json({
                                success: false,
                                message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position}.`,
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
                        userId: decodeToken.userId,
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
                });
                if (boss) {
                    const boughtBreed: BoughtBreed = new BoughtBreed();
                    boughtBreed.setUserId = decodeToken.userId;
                    const bb: any = await boughtBreed.boughtBreedServives.models.create(boughtBreed, {
                        transaction: t
                    });
                    if (bb) {
                        const result: any[] = [];
                        for (const item of itemArr) {
                            const breed: Breed = new Breed();
                            if (typeof item.breedName === 'string') {
                                breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity);
                                const bre: any = await breed.breedServives.models.create(breed, {
                                    transaction: t
                                });
                                if (bre) {
                                    const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                    boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
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
                                    });
                                if (sUpdate.length > 0) {
                                    const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                    boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), bb.boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                                    const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t });
                                    result.push(boughtBre);
                                } else {
                                    t.rollback();
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position}.`,
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
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn chưa đủ thẩm quyền thực hiện thao tác, vui lòng liên hệ với quản lý của bạn để được hỗ trợ.'
                    });
                }
            }
            // Nhân viên và phiên nhập củ
            else if (!boss && boughtBreedId) {
                boss = await this.userRolesServices.models.findOne({
                    where: {
                        userId: decodeToken.userId,
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
                });
                if (boss) {
                    const result: any[] = [];
                    for (const item of itemArr) {
                        const breed: Breed = new Breed();
                        if (typeof item.breedName === 'string') {
                            breed.setBreed(null, uuidv4(), boss.ownerId, item.breedName, item.quantity);
                            const bre: any = await breed.breedServives.models.create(breed, {
                                transaction: t
                            });
                            if (bre) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, bre.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                                const mat: any = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, {
                                    transaction: t
                                }).catch(async e => {
                                    response.status(200).json({
                                        success: false,
                                        message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position + 1}.`,
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
                                });
                            if (sUpdate.length > 0) {
                                const boughtBreedDetail: BoughtBreedDetail = new BoughtBreedDetail();
                                boughtBreedDetail.setBoughtBreedDetails(null, uuidv4(), boughtBreedId, item.breedName.breedId, item.quantity, item.unit, item.unitPrice, item.loopOfBreed, item.soldAddress, item.testingAgency, item.testingAgency);
                                const boughtBre = await boughtBreedDetail.boughtBreedDetailsServives.models.create(boughtBreedDetail, { transaction: t });
                                result.push(boughtBre);
                            } else {
                                t.rollback();
                                response.status(200).json({
                                    success: false,
                                    message: `Thực hiện không thành công, bị lỗi ở form nhập thứ ${item.position}.`,
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
        const decodeToken: any = Authentication.detoken(token);
        const query: any = {
            where: {
                [this.userRolesServices.Op.or]: [
                    {
                        userId: decodeToken.userId
                    },
                    {
                        bossId: decodeToken.userId
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
                breeds: res.boss.ownerBreed.breeds
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có vật phẩm nào trong kho của mình!'
            });
            throw e;
        });
    }
}
