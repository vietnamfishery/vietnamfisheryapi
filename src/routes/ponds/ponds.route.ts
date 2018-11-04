import { Pond, PondUserRole } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, UserServives, UserRolesServices, PondUserRolesServices, PondsServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
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
export class PondRoute extends BaseRoute {
    public static path = '/ponds';
    private static instance: PondRoute;
    private sequeliz: Sequelize = DBHelper.sequelize;
    private userServives: UserServives = new UserServives();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private pondsServices: PondsServices = new PondsServices();
    /**
     * @class PondRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondRoute.instance) {
            PondRoute.instance = new PondRoute();
        }
        return PondRoute.instance.router;
    }

    private init() {
        logger.info('[PondRoute] Creating ping route.');
        this.router.post('/add', Authentication.isLogin, this.addPond);
        this.router.get('/gets', Authentication.isLogin, this.getPonds);
        this.router.get('/gets/withRoles', Authentication.isLogin, this.getPondWithRoles);
        this.router.get('/gets/withoutImage', Authentication.isLogin, this.getPondWithoutImages);
        this.router.get('/get/:pondId', Authentication.isLogin, this.getPondById);
        this.router.put('/update', Authentication.isLogin, this.updatePond);
        this.router.get('/gets/employees', Authentication.isLogin, this.getEmployeePondRoles);
    }

    private addPond = async (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status } = request.body;
        if(!pondName || !pondCreatedDate || !pondArea || !pondDepth || !createCost || status === '' || status === null || status === undefined) {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
            });
        } else {
            pond.setPond(null, uuidv4(), decodetoken.userId, pondName, pondArea, pondDepth, createCost, status, images || defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const p: any = await pond.pondsServices.models.create(pond).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                });
                if(p) {
                    const role: any = await this.userRolesServices.models.findOne({
                        where: {
                            bossId: decodetoken.userId,
                            [this.userRolesServices.Op.and]: {
                                userId: decodetoken.userId
                            }
                        }
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                        });
                        t.rollback();
                    });
                    if (role) {
                        const pondUserRole: PondUserRole = new PondUserRole();
                        pondUserRole.setRolesId = role.rolesId;
                        pondUserRole.setPondId  = p.pondId;
                        const pur: any = await this.pondUserRolesServices.models.create(pondUserRole).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                            });
                            t.rollback();
                        });
                        if(pur) {
                            response.status(200).json({
                                success: true,
                                message: 'Thêm ao thành công.'
                            });
                            t.commit();
                        } else {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                            });
                            t.rollback();
                        }
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                        });
                        t.rollback();
                    }
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                    t.rollback();
                }
            });
        }
    }

    addPondRoles = (request: Request, response: Response, next: NextFunction) => {

    }

    private getEmployeePondRoles = (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.userRolesServices.models.findAll({
            where: {
                bossId: decodetoken.userId,
                [this.userRolesServices.Op.and]: {
                    roles: 1
                }
            },
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.USER_ROLES_2_USER
                }
            ]
        })
        .then(async (employees: any[]) => {
            response.status(200).json({
                success: true,
                message: '',
                employees
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi không mong muốn, vui lòng thử lại.'
            });
            throw e;
        });
    }

    private getPonds = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.pondsServices.models.findAll(({
            include: [
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        userId: decodetoken.userId
                    },
                    {
                        '$ponduserroles.userId$': decodetoken.userId
                    }
                ]
            }
        } as any)).then( async (res: any) => {
            if(res) {
                const endData = [];
                for(const e of res) {
                    e[`images`] = await GoogleDrive.delayGetFileById(e.images);
                    endData.push(e);
                }
                response.status(200).json({
                    success: true,
                    ponds: endData
                });
            } else {
                response.status(200).json({
                    success: true,
                    ponds: []
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    getPondWithoutImages = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.pondsServices.models.findAll(({
            include: [
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        userId: decodetoken.userId
                    },
                    {
                        '$ponduserroles.userId$': decodetoken.userId
                    }
                ]
            }
        } as any)).then( async (res: any) => {
            response.status(200).json({
                success: true,
                message: '',
                ponds: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    getPondWithRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.userRolesServices.models.findAll({
            where: {
                userId: decodetoken.userId,
                [this.userRolesServices.Op.and]: {
                    roles: {
                        [this.userRolesServices.Op.or]: [
                            0, 1
                        ]
                    }
                }
            },
            include: [
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.USER_ROLES_2_POND_USER_ROLE,
                    include: [
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.POND_USER_ROLE_2_POND
                        }
                    ]
                }
            ]
        }).then( async (res: any) => {
            response.status(200).json({
                success: true,
                message: '',
                res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!',
                e
            });
        });
    }

    private getPondById = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const { pondId } = request.params;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        pond.getById(pondId, decodetoken.userId).then( async (pond$: any) => {
            if(!pond$) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
                });
            } else {
                const p: any = pond$;
                p.pond[`images`] = await GoogleDrive.delayGetFileById(p.pond.images);
                response.status(200).json(p);
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập api này!'
            });
        });
    }

    private updatePond = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, employee } = request.body;
        if(!pondId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            pond.setPond(pondId, undefined, decodetoken.userId, pondName, pondArea, pondDepth, createCost, status, images || defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
            pond.update().then((res: any) => {
                if(!res) {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thành công!'
                    });
                }
            });
        }
    }
}
