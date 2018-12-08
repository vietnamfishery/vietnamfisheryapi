import { PondDiary } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, SeasonAndPondServices, PondDiaryServices, PondsServices, UserServives, UserRolesServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
// import { Transaction } from 'sequelize';
import { ActionAssociateDatabase, isUUId4 } from '../../common';
import { DateUtil } from '../../lib';
import { UpdateOptions } from 'sequelize';
import { updatePondDiariesSchema } from '../../schemas';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondDiaryRoute extends BaseRoute {
    public static path = '/pondDiaries';
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
        this.router.get('/gets', Authentication.isLogin, this.getPondDiaries);
        this.router.get('/gets/:pondDiaryUUId', Authentication.isLogin, this.getPondDiariesByUUId);
        this.router.post('/add', Authentication.isLogin, this.addPondDiary);
        this.router.put('/update', Authentication.isLogin, this.updatePondDiary);
        this.router.delete('/delete/:primary', Authentication.isLogin, this.deletePondDiary);

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
        if (seasonAndPond) {
            const pondDiary: PondDiary = new PondDiary();
            pondDiary.setPonddiary(null, uuidv4(), seasonAndPond.seasonAndPondId, diaryName, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes);
            pondDiary.insert().then((res: any) => {
                if (res) {
                    response.status(200).json({
                        success: true,
                        message: 'Thêm nhật ký thành công!'
                    });
                }
            }).catch(e => {
                if (e) {
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
        const { pondId, seasonId, timeOut, unitOfTime } = request.query;
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
                        DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.parse(timeOut || new Date()), unitOfTime)),
                        DateUtil.getUTCDateTime(DateUtil.endOf(DateUtil.parse(timeOut || new Date()), unitOfTime))
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

    private getPondDiariesByUUId = async (request: Request, response: Response, next: NextFunction) => {
        const { pondDiaryUUId } = request.params;
        const g: RegExp = new RegExp(isUUId4);
        if(g.test(pondDiaryUUId)) {
            this.pondDiaryServices.models.findOne({
                where: {
                    pondDiaryUUId
                }
            }).then(res => {
                if(!!Object.keys(res).length) {
                    response.status(200).json({
                        success: true,
                        message: '',
                        pondDiary: res
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Không tìm thấy nhật ký.'
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                });
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Hiện tại chúng tôi không hỗ trợ api này.'
            });
        }
    }

    /**
     * get theo ngày
     */
    private deletePondDiary = async (request: Request, response: Response, next: NextFunction) => {
        const { primary } = request.params;
        const g: RegExp = new RegExp(isUUId4);
        const query: UpdateOptions = {
            where: {}
        };
        if (g.test(primary)) {
            query.where = {
                pondDiaryUUId: primary
            };
        } else {
            query.where = {
                pondDiaryId: primary
            };
        }
        this.pondDiaryServices.models.update({
            isDeleled: 1
        }, query).then(res => {
            response.status(200).json({
                success: true,
                message: 'Đã xoá!',
                results: null
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        });
    }

    /**
     * Sửa đổi
     */
    private updatePondDiary = async (request: Request, response: Response, next: NextFunction) => {
        const validate: any = this.validator(updatePondDiariesSchema);
        const isValid: any = validate({
            ...request.body,
            fisheryQuantity: Number(request.body.fisheryQuantity)
        });

        if (!isValid) {
            if(validate.error.includes('pondDiaryUUId')) {
                response.status(200).json({
                    success: false,
                    message: 'Chúng tôi không hỗ trợ API này.'
                });
            }
            if(validate.error.includes('diaryName')) {
                response.status(200).json({
                    success: false,
                    message: 'Tên gợi nhắc không hợp lệ.'
                });
            }
            if(validate.error.includes('fisheryQuantity')) {
                response.status(200).json({
                    success: false,
                    message: 'Số lượng thuỷ sản không hợp lệ.'
                });
            }
            if(validate.error.includes('healthOfFishery')) {
                response.status(200).json({
                    success: false,
                    message: 'Tình trạng sức khoẻ không hợp lệ.'
                });
            }
            if(validate.error.includes('pondVolume')) {
                response.status(200).json({
                    success: false,
                    message: 'Thể tích ao không hợp lệ.'
                });
            }
            if(validate.error.includes('diedFishery')) {
                response.status(200).json({
                    success: false,
                    message: 'Số lượng cá chết không hợp lệ.'
                });
            }
            if(validate.error.includes('notes')) {
                response.status(200).json({
                    success: false,
                    message: 'Ghi chú không hợp lệ.'
                });
            }
        } else {
            const { diaryName, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes } = request.body;
            this.pondDiaryServices.models.update({
                diaryName, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes
            }).then(res => {
                if (!res) {
                    return response.status(200).json({
                        success: false,
                        message: 'Thất bại.'
                    });
                }
                return response.status(200).json({
                    success: true,
                    message: 'Cập nhật thành công.',
                    results: null
                });
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
                });
            });
        }
    }
}
