import { Season } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, UserRolesServices, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { addSeasonSchema } from '../../schemas';

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
        this.router.post('/add', Authentication.isLogin, this.addSeason);
        this.router.get('/gets', Authentication.isLogin, this.getSeasons);
        this.router.put('/update', Authentication.isLogin, this.updateSeason);
        this.router.get('/get/:seasonUUId', Authentication.isLogin, this.getSeasonByUUId);
        this.router.post('/get', Authentication.isLogin, this.getSeasonById);
        this.router.get('/gets/present', Authentication.isLogin, this.getPresentSeason);

        // log endpoints
        this.logEndpoints(this.router, SeasonRoute.path);
    }

    /**
     * Thêm mới vụ
     * Điều kiện: mỗi user chỉ có 1 vụ có status 0 trong tổng số vụ
     * Tìm vụ đang có status = 0
     * tạo transaction update lại vụ đã tìm thấy thành 1
     * và thêm vụ mới với status bằng 0 với tên vụ được người dùng gửi lên
     */
    private addSeason = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonName } = request.body;
        const validate: any = this.validator(addSeasonSchema);
        const filter: any = this.validator.filter(addSeasonSchema);
        const filtered: any = filter(request.body);
        const validater: boolean = validate(filtered);
        if(validater) {
            // start authozation info
            const token: string = request.headers.authorization;
            const deToken: any = Authentication.detoken(token);
            const { userId } = deToken;
            this.sequeliz.transaction().then(async (t: Transaction) => {
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

                if(onUpdate) {
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
        const token: string = request.headers.authorization;
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
        const { seasonId, seasonName, status } = request.body;
        if (!seasonId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            const season: Season = new Season();
            season.setSeason(seasonId, null, null, seasonName, status);
            season.update().then((res: any) => {
                if (!res) {
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

    private getSeasonByUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { seasonUUId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization;
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
