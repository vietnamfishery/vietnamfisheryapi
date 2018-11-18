import { Pond } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, UserServives, UserRolesServices, PondUserRolesServices, SeasonServices, PondsServices, SeasonAndPondServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';

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
    private userServives: UserServives = new UserServives();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();

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
        this.router.post('/add', Authentication.isLogin, this.addPond); // Thêm ao
        this.router.get('/gets', Authentication.isLogin, this.getPonds); // get all - có hình
        this.router.get('/gets/withoutImage', Authentication.isLogin, this.getPondWithoutImages); // get all kèm với quyền - không hình
        this.router.get('/get/:pondUUId', Authentication.isLogin, this.getPondByPondUUId);  // get với UUID
        this.router.put('/update', Authentication.isLogin, this.updatePond); // Cập nhật
        this.router.get('/gets/employees', Authentication.isLogin, this.getEmployeePondRoles); // get nhân viên theo ao
        this.router.get('/gets/season/:seasonUUId', Authentication.isLogin, this.getPondBySeasonUUId); // get ao theo vụ nuôi
        this.router.post('/gets/seasonUUId', Authentication.isLogin, this.getPostPondBySeasonUUId); // get ao theo vụ nuôi
        this.router.post('/count', Authentication.isLogin, this.countPond); // đếm ao của user
        this.router.post('/get/notin/seasonAndPond', Authentication.isLogin, this.getPondNotInSeasonAndPond); // đếm ao của user
        this.router.post('/gets/ownerSeason', Authentication.isLogin, this.getPondByOwnerSeason); // đếm ao của user
        this.router.post('/gets/ownerSeason/WithImage', Authentication.isLogin, this.getPondByOwnerSeasonWithImage); // đếm ao của user
        this.router.get('/gets/advanced', Authentication.isLogin, this.getPondAdvanceds); // đếm ao của user
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
                        pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, data.fileId, pondLatitude !== '' ? pondLatitude : undefined, pondLongitude !== '' ? pondLongitude : undefined, pondCreatedDate);
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
                pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
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
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAll(({
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

    private getPondWithoutImages = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAll(({
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

    private getPondNotInSeasonAndPond = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId, ownerId } = request.body;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            let ponds: any = await this.seasonAndPondServices.models.findAll({
                include: [
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                        where: {
                            seasonUUId,
                            userId: ownerId
                        },
                        attributes: []
                    }
                ],
                attributes: ['pondId'],
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Lỗi đường truyền, vui lòng thử lại sau.'
                });
                return t.rollback();
            });
            if (ponds.length) {
                ponds = ponds.map(element => {
                    return element.pondId;
                });
                const p: any = await this.pondsServices.models.findAll({
                    where: {
                        pondId: {
                            [this.sequeliz.Op.notIn]: ponds
                        },
                        userId: ownerId
                    },
                    transaction: t
                }).catch(e => {
                    e;
                    response.status(200).json({
                        success: false,
                        message: 'Lỗi đường truyền, vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if (!p) {
                    response.status(200).json({
                        success: false,
                        message: 'Không tìm thấy ao.'
                    });
                    t.rollback();
                } else {
                    t.commit();
                    response.status(200).json({
                        success: true,
                        message: '',
                        ponds: p
                    });
                }
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao.',
                    ponds
                });
                t.rollback();
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau.'
            });
        });
    }

    private getPondByPondUUId = (request: Request, response: Response, next: NextFunction) => {
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
        const { pondUUId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, isFed, isDiary } = request.body;
        if (!pondUUId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            if (request.files) {
                GoogleDrive.upload(request, response, next).then((data: any) => {
                    if (data.fileId) {
                        pond.setPond(null, undefined, undefined, pondName, pondArea, pondDepth, createCost, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, data.fileId, pondLatitude, pondLongitude, pondCreatedDate);
                        pond.pondsServices.models.update({
                            pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, isFed, isDiary
                        }, {
                            where: {
                                pondUUId
                            },
                            returning: true
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
                pond.pondsServices.models.update({
                    pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, isFed
                }, {
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

    private getPondBySeasonUUId = (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAll({
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        seasonUUId
                    },
                    attributes: []
                }
            ]
        }).then((ponds: any) => {
            response.status(200).json({
                success: true,
                message: '',
                ponds
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: '',
                e
            });
        });
    }

    private getPostPondBySeasonUUId = (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId, ownerId } = request.body;
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAll({
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        seasonUUId
                    },
                    attributes: []
                }
            ],
            where: {
                userId: ownerId
            }
        }).then((ponds: any) => {
            response.status(200).json({
                success: true,
                message: '',
                ponds
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: '',
                e
            });
        });
    }

    /**
     * Get ao các ao của vụ hiện tại
     * có check status
     */
    private getPondByOwnerSeason = async (request: Request, response: Response, next: NextFunction) => {
        const { ownerId, status } = request.body;
        const query: any = {
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    },
                    attributes: []
                },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON_AND_POND,
                    attributes: []
                }
            ],
            where: {
                userId: ownerId
            }
        };
        if (status) {
            const where: any = {
                status
            };
            query.where = {
                ...query.where,
                ...where
            };
        }
        this.pondsServices.models.findAll(query).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                ponds: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau.'
            });
        });
    }

    private getPondByOwnerSeasonWithImage = async (request: Request, response: Response, next: NextFunction) => {
        const { ownerId, status } = request.body;
        const query: any = {
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    },
                    attributes: []
                },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON_AND_POND,
                    attributes: []
                }
            ],
            where: {
                userId: ownerId
            }
        };
        if (status) {
            const where: any = {
                status
            };
            query.where = {
                ...query.where,
                ...where
            };
        }
        this.pondsServices.models.findAll(query).then(async (res: any[]) => {
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

    /**
     * Đếm tổng số ao của người dùng
     */
    private countPond = (request: Request, response: Response, next: NextFunction) => {
        const { pondOwner } = request.body;
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAndCountAll({
            where: {
                userId: pondOwner
            }
        }).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                pondsQuantity: res.count
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    /**
     * @method GET
     * Hàm lấy danh sách ao của người dùng đang đăng nhập
     * request - token
     * option - image: get ao kèm thêm hình
     * option - isnull: get ao trống
     * option - isnotnull: get ao đang nuôi thả
     * option - isupgrade: get ao đang nâng cấp
     * option - seasonid: get ao đang nâng cấp
     */
    private getPondAdvanceds = async (request: Request, response: Response, next: NextFunction) => {
        // flagged
        const { image, isnull, isnotnull, isupgrade, seasonid } = request.headers;

        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const query: FindOptions<any> = {
            include: [],
            where: {}
        };
        if (!isBoss) {
            // vụ mặc định
            const presentSeason: any = {
                model: this.seasonServices.models,
                as: ActionAssociateDatabase.POND_2_SEASON,
                where: {
                    userId: ownerId,
                    status: 0
                }
            };
            // các ao có quyền
            const rule: any = {
                model: this.pondUserRolesServices.models,
                as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                where: {
                    userId
                }
            };
            query.include.push(presentSeason);
            query.include.push(rule);
        } else {
            if(!seasonid) {
                // load vụ mặc định
                const presentSeason: any = {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    }
                };
                query.include.push(presentSeason);
            } else {
                // load theo vụ yêu cầu
                const requestSeason: any = {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        seasonId: seasonid
                    }
                };
                query.include.push(requestSeason);
            }
        }
        if (isnull === 'true') {
            // ao trống
            query.where = {
                status: 0
            };
        } else if (isnotnull === 'true') {
            // ao đang nuôi
            query.where = {
                status: 1
            };
        } else if (isupgrade === 'true') {
            // ao đang nâng cấp
            query.where = {
                status: 2
            };
        }
        this.pondsServices.models.findAll(query).then(async (res: any[]) => {
            if (image === 'true') {
                if (res.length) {
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
                        message: 'Không tìm thấy ao.',
                        ponds: []
                    });
                }
            } else {
                if (!res.length) {
                    response.status(200).json({
                        success: true,
                        message: 'Không tìm thấy ao.',
                        ponds: []
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: '',
                        ponds: res
                    });
                }
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra.',
                e
            });
        });
    }
}
