import { PondDiary } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, SeasonAndPondServices, PondDiaryServices, PondsServices, UserServives, UserRolesServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
// import { Transaction } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';
import { DateUtil } from '../../lib';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondDiaryRoute extends BaseRoute {
    public static path = '/pondDiarys';
    private static instance: PondDiaryRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private pondDiaryServices: PondDiaryServices = new PondDiaryServices();
    private userServives: UserServives = new UserServives();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    /**
     * @class PondDiaryRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondDiaryRoute.instance) {
            PondDiaryRoute.instance = new PondDiaryRoute();
        }
        return PondDiaryRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[PondDiaryRoute] Creating diary route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addPondDiary);
        this.router.post('/gets', Authentication.isLogin, this.getPondDiaries);
        this.router.put('/update', Authentication.isLogin, this.updatePondDiary);

        // log endpoints
        this.logEndpoints(this.router, PondDiaryRoute.path);
    }

    private addPondDiary = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes, diaryName } = request.body;
        const seasonAndPond: any = await this.seasonAndPondServices.models.findOne({
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    },
                    attributes: []
                }
            ],
            where: {
                pondId
            },
            attributes: ['seasonAndPondId']
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
        if(seasonAndPond) {
            const pondDiary: PondDiary = new PondDiary();
            pondDiary.setPonddiary(null, uuidv4(), seasonAndPond.seasonAndPondId, diaryName, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes);
            pondDiary.insert().then((res: any) => {
                if(res) {
                    response.status(200).json({
                        success: true,
                        message: 'Thêm nhật ký thành công!'
                    });
                }
            }).catch(e => {
                if(e) {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                    });
                }
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền vui liên hệ với quản lý của bạn để được hỗ trợ.'
            });
        }
    }

    /**
     * Get theo tháng, theo user join từ vự
     * @param request
     * @param response
     * @param next
     */
    private getPondDiaries = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, seasonId, options } = request.body;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;

        this.pondDiaryServices.models.findAll({
            include: [
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_DIARY_2_SEASON_AND_POND,
                    include: [
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            include: [
                                {
                                    model: this.userServives.models,
                                    as: ActionAssociateDatabase.POND_2_USER,
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
                                                        userId,
                                                        roles: 2
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            where: {
                                userId: ownerId
                            }
                        },
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
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
                                                        userId,
                                                        roles: 2
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            where: {
                                userId: ownerId
                            }
                        }
                    ],
                    where: {
                        seasonId,
                        pondId
                    }
                }
            ],
            where: {
                createdDate: {
                    [this.sequeliz.Op.between]: [
                        DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.parse(options.timeOut || new Date()), options.unitOfTime)),
                        DateUtil.getUTCDateTime(DateUtil.endOf(DateUtil.parse(options.timeOut || new Date()), options.unitOfTime))
                    ]
                }
            }
        }).then(res => {
            if (res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    diaries: res
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy nhật ký cho ăn của ao này'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    /**
     * get theo ngày
     */
    private getPondDiaryByDay = async (request: Request, response: Response, next: NextFunction) => {
        //
    }

    /**
     * Sửa đổi
     */
    private updatePondDiary = async (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
