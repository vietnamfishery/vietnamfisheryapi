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
        this.router.get('/get/:pondUUId', Authentication.isLogin, this.getPondByUUId);
        this.router.put('/update', Authentication.isLogin, this.updatePond);
        this.router.get('/gets/employees', Authentication.isLogin, this.getEmployeePondRoles);
    }

    private addPond = async (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondLatitude, pondLongitude, status } = request.body;
        if (!pondName || !pondCreatedDate || !pondArea || !pondDepth || !createCost || status === '' || status === null || status === undefined) {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
            });
        } else {
            if (request.files) {
                GoogleDrive.upload(request, response, next).then((data: any) => {
                    if (data.fileId) {
                        pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, status, data.fileId, pondLatitude, pondLongitude, pondCreatedDate);
                        pond.pondsServices.models.create(pond).then((pond$: Pond) => {
                            response.status(200).json({
                                success: true,
                                message: 'Thêm ao mới thành công.'
                            });
                        }).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                            });
                        });
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                        });
                    }
                });
            } else {
                pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, status, defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
                pond.pondsServices.models.create(pond).then((pond$: Pond) => {
                    response.status(200).json({
                        success: true,
                        message: 'Thêm ao mới thành công.'
                    });
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                });
            }
        }
    }

    private getEmployeePondRoles = (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
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
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        this.pondsServices.models.findAll(({
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.POND_2_EMPLOYEE,
                    required: false,
                    attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
                },
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false,
                    attributes: []
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        userId: deToken.userId
                    },
                    {
                        '$ponduserroles.userId$': deToken.userId
                    }
                ]
            }
        } as any)).then(async (res: any[]) => {
            if (res.length > 0) {
                const endData = [];
                for (const e of res) {
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
            e;
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    getPondWithoutImages = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        this.pondsServices.models.findAll(({
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.POND_2_EMPLOYEE,
                    required: false,
                    attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
                },
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false,
                    attributes: []
                }
            ],
            where: {
                [this.sequeliz.Op.or]: [
                    {
                        userId: deToken.userId
                    },
                    {
                        '$ponduserroles.userId$': deToken.userId
                    }
                ]
            }
        } as any)).then(async (res: any) => {
            response.status(200).json({
                success: true,
                message: '',
                ponds: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!',
                e
            });
        });
    }

    getPondWithRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
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
        }).then(async (res: any) => {
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

    private getPondByUUId = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const { pondUUId } = request.params;
        const token: string = request.headers.authorization;
        const decodetoken: any = Authentication.detoken(token);
        const query: any = {
            include: [
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false,
                    include: [
                        {
                            model: this.userServives.models,
                            as: ActionAssociateDatabase.POND_USER_ROLE_2_USER
                        }
                    ]
                }
            ],
            where: {
                pondUUId,
                [pond.pondsServices.Op.and]: {
                    [this.sequeliz.Op.or]: [
                        {
                            userId: decodetoken.userId
                        },
                        {
                            '$ponduserroles.userId$': decodetoken.userId
                        }
                    ]
                }
            }
        };
        pond.pondsServices.models.findOne(query).then((pond$: any) => {
            if (pond$) {
                response.status(200).json({
                    success: true,
                    message: '',
                    pond: pond$.dataValues
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn không có quyền truy cập'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private updatePond = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { pondUUId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status } = request.body;
        if (!pondUUId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            if (request.files) {
                GoogleDrive.upload(request, response, next).then((data: any) => {
                    if (data.fileId) {
                        pond.setPond(null, undefined, undefined, pondName, pondArea, pondDepth, createCost, status, data.fileId, pondLatitude, pondLongitude, pondCreatedDate);
                        pond.pondsServices.models.update(pond.getFields(pond),{
                            where: {
                                pondUUId
                            }
                        }).then((pond$: any) => {
                            response.status(200).json({
                                success: true,
                                message: 'Cập nhật thành công.'
                            });
                        }).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                            });
                        });
                    } else {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                        });
                    }
                });
            } else {
                pond.setPond(null, undefined, undefined, pondName, pondArea, pondDepth, createCost, status, images, pondLatitude, pondLongitude, pondCreatedDate);
                pond.pondsServices.models.update(pond.getFields(pond),{
                    where: {
                        pondUUId
                    }
                }).then((pond$: any) => {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thành công.'
                    });
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                    });
                });
            }
        }
    }
}
