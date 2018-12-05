import { Season } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, UserRolesServices, UserServives, PondsServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { addSeasonSchema, updateSeasonsSchema } from '../../schemas';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class SeasonRoute extends BaseRoute {
    public static path = '/seasons';
    private static instance: SeasonRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private userServives: UserServives = new UserServives();
    private userRolesServices: UserRolesServices = new UserRolesServices();

    /**
     * @class SeasonRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!SeasonRoute.instance) {
            SeasonRoute.instance = new SeasonRoute();
        }
        return SeasonRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[SeasonRoute] Creating season route.');

        // add route
        this.router.get('/gets', Authentication.isLogin, this.getSeasons);
        this.router.get('/get/:seasonUUId', Authentication.isLogin, this.getSeasonByUUId);
        this.router.get('/gets/present', Authentication.isLogin, this.getPresentSeason);
        this.router.post('/get', Authentication.isLogin, this.getSeasonById);
        this.router.post('/add', Authentication.isLogin, Authentication.isBoss, this.addSeason);
        this.router.put('/update', Authentication.isLogin, Authentication.isBoss, this.updateSeason);

        // log endpoints
        this.logEndpoints(this.router, SeasonRoute.path);
    }

    /**
     * Thêm mới vụ với điều kiện:
     * - Mỗi user chỉ có 1 vụ có status 0 trong tổng số vụ
     * - Tất cả ao đều được thu hoạch xong
     *
     * Cập nhật lại bảng Ponds:
     * - status
     * - isFed
     * - isDiary
     */
    private addSeason = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonName } = request.body;
        const validate: any = this.validator(addSeasonSchema);
        const filter: any = this.validator.filter(addSeasonSchema);
        const filtered: any = filter(request.body);
        const validater: boolean = validate(filtered);
        if (validater) {
            // start authozation info
            const token: string = request.headers.authorization.split(' ')[1];
            const deToken: any = Authentication.detoken(token);
            const { userId } = deToken;

            const wasHarvest: any = await this.pondsServices.models.findAll({
                where: {
                    userId,
                    status: 1
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                });
            });
            // Còn vụ chưa thu hoạch
            if (!!wasHarvest.length) {
                return response.status(200).json({
                    success: false,
                    message: 'Bạn không thể thêm vụ nuôi mới khi còn ao chưa thu hoạch.',
                    wasHarvest: false
                });
            }
            this.sequeliz.transaction().then(async (t: Transaction) => {
                const resetStatus: any = await this.pondsServices.models.update({
                    status: 0,
                    isFed: 0,
                    isDiary: 0
                }, {
                        where: {
                            userId,
                            status: 1
                        },
                        transaction: t
                    }).catch(e => {
                        return t.rollback();
                    });
                const onUpdate: any = await this.seasonServices.models.update({
                    status: 1
                }, {
                        where: {
                            userId,
                            status: 0
                        },
                        returning: true,
                        transaction: t
                    }).catch(e => {
                        return t.rollback();
                    });

                if (onUpdate) {
                    const season = new Season();
                    season.setSeason(null, uuidv4(), userId, seasonName, 0);
                    season.seasonServices.models.create(season, {
                        transaction: t
                    }).then((res: any) => {
                        if (res) {
                            response.status(200).json({
                                success: true,
                                message: 'Thêm vụ thành công!',
                                season: res
                            });
                            t.commit();
                        }
                    }).catch(e => {
                        return t.rollback();
                    });
                } else {
                    return t.rollback();
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                });
            });
        } else {
            response.status(200).json({
                success: true,
                message: 'Vui lòng cung cấp đúng tên vụ.'
            });
        }
    }

    /**
     * Get All vụ theo user
     * chức năng của admin
     */
    private getSeasons = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        this.seasonServices.models.findAll({
            where: {
                userId: isBoss ? userId : ownerId
            }
        }).then(ss => {
            if (ss) {
                response.status(200).json({
                    success: true,
                    seasons: ss
                });

            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.',
                    seasons: null
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    private updateSeason = async (request: Request, response: Response, next: NextFunction) => {
        // validate
        const validate: any = this.validator(updateSeasonsSchema);
        const filter: any = this.validator.filter(updateSeasonsSchema);
        const filtered: any = filter(request.body);
        const validater: boolean = validate(filtered);
        if(validater) {
            const { seasonId, seasonUUId, seasonName, status } = request.body;
            const data: any = {
                ...(seasonName ? {seasonName} : {}),
                ...(status ? {status} : {}),
            };
            this.seasonServices.models.update(data, {
                where: {
                    [this.sequeliz.Op.or]: [
                        {seasonId},
                        {seasonUUId}
                    ]
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                });
            }).then(res => {
                if(res) {
                    response.status(200).json({
                        success: true,
                        message: 'Cập nhật thành công!'
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Thất bại.'
                    });
                }
            });
        } else {
            console.log(validate.error);
        }
    }

    private getSeasonByUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        const season: Season = new Season();
        season.seasonServices.models.findOne({
            include: [
                {
                    model: this.userServives.models,
                    as: ActionAssociateDatabase.SEASON_2_USER,
                    include: [
                        {
                            model: this.userRolesServices.models,
                            as: ActionAssociateDatabase.USER_2_ROLES_GET_EMPLOYEES,
                            required: false,
                            where: {
                                [this.sequeliz.Op.or]: [
                                    {
                                        bossId: userId
                                    },
                                    {
                                        userId
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            where: {
                seasonUUId,
                userId: ownerId
            }
        }).then((res: Season) => {
            response.status(200).json({
                success: true,
                message: '',
                season: res
            });
        }).catch(e => {
            e;
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private getSeasonById = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonId } = request.body;
        this.seasonServices.models.findById(seasonId).then((res: Season) => {
            response.status(200).json({
                success: true,
                message: '',
                season: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private getPresentSeason = async (request: Request, response: Response, next: NextFunction) => {
        const { ownerid } = request.headers;
        this.seasonServices.models.findOne({
            where: {
                userId: ownerid,
                status: 0
            }
        }).then((res: any) => {
            if (res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    season: res.dataValues
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn không có vụ nào được kích hoạt, vui lòng kích hoạt một vụ mùa trong hệ thống.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }
}
