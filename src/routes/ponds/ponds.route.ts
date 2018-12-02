import { Pond } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, UserServives, UserRolesServices, PondUserRolesServices, SeasonServices, PondsServices, SeasonAndPondServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction, FindOptions } from 'sequelize';
import { addPondSchema } from '../../schemas';
import { DateUtil } from '../../lib';

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
        // log message
        logger.info('[PondRoute] Creating pond route.');

        // add route
        this.router.get('/gets', Authentication.isLogin, this.getPonds); // get ponds
        this.router.get('/get/:pondUUId', Authentication.isLogin, this.getPondByPondUUId);  // get với UUID
        // this.router.get('/gets/withoutImage', Authentication.isLogin, this.getPondWithoutImages); // get all kèm với quyền - không hình [bỏ]
        // this.router.get('/gets/employees', Authentication.isLogin, this.getEmployeePondRoles); // get nhân viên theo ao [không sử dụng]
        // this.router.get('/gets/advanced', Authentication.isLogin, this.getPondAdvanceds); // [gộp vào gets]
        // this.router.get('/gets/season/:seasonUUId', Authentication.isLogin, this.getPondBySeasonUUId); // get ao theo vụ nuôi với seasonUUId
        this.router.get('/gets/boss', Authentication.isLogin, this.getPondOfBoss);
        this.router.post('/add', Authentication.isLogin, this.addPond); // Thêm ao
        // this.router.post('/gets/seasonUUId', Authentication.isLogin, this.getPostPondBySeasonUUId); // get ao theo vụ nuôi [nên đổi về phương thức get]
        // this.router.post('/count', Authentication.isLogin, this.countPond); // đếm ao của user - [tích hwjp vào gets]
        // this.router.post('/seasons/count', Authentication.isLogin, this.countSeasonWithPond); // nên tích hợp vào get pond
        this.router.post('/get/notin/seasonAndPond', Authentication.isLogin, this.getPondNotInSeasonAndPond); // get số ao không có trong vụ [to GET]
        this.router.post('/gets/ownerSeason/WithImage', Authentication.isLogin, this.getPondByOwnerSeasonWithImage); // /** Xem xét */get ao của người dùng hiện tại có hình ảnh
        this.router.post('/gets/notEmployee', Authentication.isLogin, this.getPondWithUserNotManage); // Xem xét
        this.router.post('/gets/not/manage', Authentication.isLogin, this.getPondWithoutManager); // Xem xét
        this.router.put('/update', Authentication.isLogin, this.updatePond); // Cập nhật [Ok]

        // log endpoints
        this.logEndpoints(this.router, PondRoute.path);
    }

    private addPond = async (request: Request, response: Response, next: NextFunction) => {
        const validate: any = this.validator(addPondSchema);
        const dataCheck: any = {
            pondName: request.body.pondName,
            createCost: request.body.createCost - 0,
            pondArea: request.body.pondArea - 0,
            pondCreatedDate: new Date(request.body.pondCreatedDate).toJSON(),
            pondDepth: request.body.pondDepth - 0,
            pondLatitude: (request.body.pondLatitude - 0) || null,
            pondLongitude: (request.body.pondLongitude - 0) || null,
            status: request.body.status - 0
        };
        const validater: boolean = validate(dataCheck);
        if(validater) {
            const pond: Pond = new Pond();
            const token: string = request.headers.authorization.split(' ')[1];
            const deToken: any = Authentication.detoken(token);
            const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondLatitude, pondLongitude, status } = request.body;
            if(DateUtil.getUTCDateTime(pondCreatedDate) > DateUtil.getUTCDateTime()) {
                return response.status(200).json({
                    success: false,
                    message: 'Ngày tạo ao không thể lớn hơn ngày hiện tại.'
                });
            } else {
                if (request.files) {
                    GoogleDrive.upload(request, response, next).then((data: any) => {
                        if (data.fileId) {
                            pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, pondCreatedDate, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, 0, data.fileId, pondLatitude !== '' ? pondLatitude : undefined, pondLongitude !== '' ? pondLongitude : undefined);
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
                    pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, pondCreatedDate, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, 0, defaultImage.pondImage, pondLatitude !== '' ? pondLatitude : undefined, pondLongitude !== '' ? pondLongitude : undefined);
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
        } else {
            response.status(200).json({
                success: false,
                message: 'Dữ liệu cung cấp không phù hợp, vui lòng kiếm tra và thử lại sau.'
            });
        }
    }

    private getEmployeePondRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split(' ')[1];
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
                    as: ActionAssociateDatabase.USER_ROLES_2_USER,
                    attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
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
        const { seasonUUId, status, seasonId } = request.query;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        let query: FindOptions<any> = {
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.POND_2_EMPLOYEE_MAYNY_ROLES,
                    required: false,
                    attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
                },
                {
                    model: this.pondUserRolesServices.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false,
                    attributes: []
                },
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
                    required: false
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
            } as any
        };
        if(!!seasonUUId) {
            if(!isBoss) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có quyền thao tác này!'
                });
            }
            query = {
                include: [
                    {
                        model: this.userServives.models,
                        as: ActionAssociateDatabase.POND_2_EMPLOYEE_MAYNY_ROLES,
                        required: false,
                        attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
                    },
                    {
                        model: this.pondUserRolesServices.models,
                        as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                        required: false,
                        attributes: []
                    },
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.POND_2_SEASON,
                        where: {
                            seasonUUId,
                            userId: ownerId
                        },
                        attributes: []
                    },
                    {
                        model: this.seasonAndPondServices.models,
                        as: ActionAssociateDatabase.POND_2_SEASON_AND_POND,
                        required: false
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
                } as any
            };
        }
        if(!!seasonId) {
            if(!isBoss) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không có quyền thao tác này!'
                });
            }
            query = {
                include: [
                    {
                        model: this.userServives.models,
                        as: ActionAssociateDatabase.POND_2_EMPLOYEE_MAYNY_ROLES,
                        required: false,
                        attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
                    },
                    {
                        model: this.pondUserRolesServices.models,
                        as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                        required: false,
                        attributes: []
                    },
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.POND_2_SEASON,
                        where: {
                            seasonId,
                            userId: ownerId
                        },
                        attributes: []
                    },
                    {
                        model: this.seasonAndPondServices.models,
                        as: ActionAssociateDatabase.POND_2_SEASON_AND_POND,
                        required: false
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
                } as any
            };
        }
        if(!!status) {
            if(status.includes('notnull')) /** Ao đang nuôi + đang nâng cấp */ {
                const notIn: any = {
                    status: {
                        [this.sequeliz.Op.notIn]: [0]
                    }
                };
                query.where = {
                    ...query.where,
                    ...notIn
                };
            } else if(status.includes('forPrepare')) /** Ao trống + đang nâng cấp */ {
                const condition: any = {
                    status: {
                        [this.sequeliz.Op.notIn]: [1]
                    }
                };
                query.where = {
                    ...query.where,
                    ... condition
                };
            } else if(status.includes('forStocking')) /** Ao trống + đang nuôi */ {
                const condition: any = {
                    status: {
                        [this.sequeliz.Op.notIn]: [2]
                    }
                };
                query.where = {
                    ...query.where,
                    ... condition
                };
            } else /** theo status gui len */ {
                query.where = {
                    ...query.where,
                    status: status as any - 0
                };
            }
        }
        this.pondsServices.models.findAll(query).then(async (res: any) => {
            if(!Object.keys(res).length) {
                response.status(200).json({
                    success: false,
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
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    private getPondOfBoss = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        if (!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        } else {
            this.pondsServices.models.findAll({
                where: {
                    userId
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
                });
            }).then((res: any) => {
                if (!res.length) {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn không có ao nào trong hệ thống'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: '',
                        ponds: res
                    });
                }
            });
        }
    }

    private getPondWithoutImages = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const pond: Pond = new Pond();
        pond.pondsServices.models.findAll(({
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    required: false,
                    // attributes: ['userId', 'username', 'firstname', 'lastname', 'userUUId']
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
        const { seasonUUId } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
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
                const p: any = await this.pondsServices.models.findAll({
                    where: {
                        userId: ownerId
                    },
                    transaction: t
                }).catch(e => {
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
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau.'
            });
        });
    }

    private getPondByPondUUId = async (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const { pondUUId } = request.params;
        const token: string = request.headers.authorization.split(' ')[1];
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
                            as: ActionAssociateDatabase.POND_USER_ROLE_2_USER,
                            attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
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

    private updatePond = async (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if (!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        }
        const { pondUUId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, wasHarvests, pondLatitude, pondLongitude, status, isFed, isDiary } = request.body;
        if (!pondUUId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            if (request.files) {
                GoogleDrive.upload(request, response, next).then((data: any) => {
                    if (data.fileId) {
                        pond.setPond(null, uuidv4(), deToken.userId, pondName, pondArea, pondDepth, createCost, pondCreatedDate, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, wasHarvests, data.fileId, pondLatitude !== '' ? pondLatitude : undefined, pondLongitude !== '' ? pondLongitude : undefined);
                        pond.pondsServices.models.update({
                            pondName, pondCreatedDate, pondArea, pondDepth, createCost, images:
                                data.fileId, pondLatitude, pondLongitude, status, isFed, isDiary
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
                    pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondLatitude, pondLongitude, status, isFed
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

    private getPondBySeasonUUId = async (request: Request, response: Response, next: NextFunction) => {
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

    private getPostPondBySeasonUUId = async (request: Request, response: Response, next: NextFunction) => {
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
        const { status } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
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
     * Get ao mà người dùng đó không có quyền - sử dụng cho chức năng phân quyền ao
     * Get theo pondUserRolesId
     * @method POST
     */
    private getPondWithoutManager = async (request: Request, response: Response, next: NextFunction) => {
        const { employeeId } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if (!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        } else {
            if (employeeId) {
                const pondByManage: any = await this.pondUserRolesServices.models.findAll({
                    where: {
                        userId: employeeId
                    }
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
                    });
                });
                const query: FindOptions<any> = {
                    include: [],
                    where: {}
                };
                if (pondByManage.length) {
                    query.where = {
                        userId,
                        [this.sequeliz.Op.notIn]: pondByManage
                    };
                } else {
                    query.where = {
                        userId,
                    };
                }
                this.pondsServices.models.findAll(query).then(async (res: any[]) => {
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
                }).catch(e => {
                    e;
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra.'
                    });
                });
            } else {
                return response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra.'
                });
            }
        }
    }

    /**
     * Đếm tổng số ao của người dùng
     */
    private countPond = async (request: Request, response: Response, next: NextFunction) => {
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
     * option - image: boolean get ao kèm thêm hình
     * option - isnull: boolean get ao trống
     * option - isnotnull: boolean get ao đang nuôi thả
     * option - isupgrade: boolean get ao đang nâng cấp
     * option - seasonid: string|number get ao theo vụ chỉ định
     */
    private getPondAdvanceds = async (request: Request, response: Response, next: NextFunction) => {
        // flagged
        const { image, isnull, isnotnull, isupgrade, seasonid, notRoles, userid, seasonuuid } = request.headers;

        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        // init query
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
            if (!seasonid) {
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
            } else if(seasonuuid) /* load theo id vụ yêu cầu */ {
                const requestSeason: any = {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        seasonUUId: seasonuuid
                    }
                };
                query.include.push(requestSeason);
            } else  {
                // load theo id vụ yêu cầu
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
            if (!res.length) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao khả dụng.',
                    ponds: []
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    ponds: res
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra.'
            });
        });
    }

    /**
     * @method POST
     * Đếm số vụ của ao chỉ định
     */
    private countSeasonWithPond = async (request: Request, response: Response, next: NextFunction) => {
        const { pondUUId } = request.body;
        this.seasonAndPondServices.models.findAndCountAll({
            include: [
                {
                    model: this.pondsServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                    where: {
                        pondUUId
                    },
                    attributes: []
                }
            ]
        }).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                count: res.count
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra.'
            });
        });
    }

    /**
     * Get All pond mà người dùng chỉ định không có quản lý
     * @method POST
     * @param request.body.employeeId
     */
    private getPondWithUserNotManage = async (request: Request, response: Response, next: NextFunction) => {
        const { employeeId } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if (!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        } else {
            if (employeeId) {
                const pondByManage: any = await this.pondUserRolesServices.models.findAll({
                    where: {
                        userId: employeeId
                    }
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
                    });
                });
                const query: FindOptions<any> = {
                    include: [],
                    where: {}
                };
                if (pondByManage.length) {
                    query.where = {
                        userId,
                        pondId: {
                            [this.sequeliz.Op.notIn]: pondByManage.map((e: any) => e.pondId)
                        }
                    };
                } else {
                    query.where = {
                        userId,
                    };
                }
                this.pondsServices.models.findAll(query).then(async (res: any[]) => {
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
                }).catch(e => {
                    e;
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra.'
                    });
                });
            } else {
                return response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra.'
                });
            }
        }
    }
}
