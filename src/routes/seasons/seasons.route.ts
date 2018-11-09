import { Season } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, PondsServices, SeasonAndPondServices, StockingServices, StockingDetailsServices, BreedServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
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
export class SeasonRoute extends BaseRoute {
    public static path = '/seasons';
    private static instance: SeasonRoute;
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private stockingServices: StockingServices = new StockingServices();
    private stockingDetailsServices: StockingDetailsServices = new StockingDetailsServices();
    private breedServives: BreedServives = new BreedServives();
    private sequeliz: Sequelize = DBHelper.sequelize;

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
        logger.info('[SeasonRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addSeason);
        this.router.get('/gets', Authentication.isLogin, this.getSeasons);
        this.router.put('/update', Authentication.isLogin, this.updateSeason);
        // this.router.post('/getPondOfSeason', Authentication.isLogin, this.getpondOfSeasonById);
        // this.router.post('/getpondNotInSeason', Authentication.isLogin, this.getpondNotInSeasonById);
        // this.router.get('/get/:seasonId', Authentication.isLogin, this.getSeasonById);
    }

    /**
     * Thêm mới vụ
     * Điều kiện: mỗi user chỉ có 1 vụ có status 0 trong tổng số vụ
     * Tìm vụ đang có status = 0
     * tạo transaction update lại vụ đã tìm thấy thành 1
     * và thêm vụ mới với status bằng 0 với tên vụ được người dùng gửi lên
     */
    private addSeason = (request: Request, response: Response, next: NextFunction) => {
        const { seasonName } = request.body;
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        this.sequeliz.transaction().then(async (t: Transaction) => {
            let season: Season = new Season();
            const ss: any = await season.seasonServices.models.findOne({
                where: {
                    userId: deToken.userId,
                    status: 0
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau!'
                });
                t.rollback();
            });
            if(ss)/* Tìm thấy */ {
                season = new Season();
                season.setStatus = 1;
                const onUpdate: any = await season.seasonServices.models.update(season.getFields(), {
                    where: {
                        seasonId: ss.seasonId
                    },
                    returning: true,
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau!'
                    });
                    t.rollback();
                });
                if(onUpdate) {
                    season = new Season();
                    season.setSeason(null, uuidv4(), deToken.userId, seasonName, 0);
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
                        if (e) {
                            response.status(200).json({
                                success: false,
                                message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                            });
                            t.rollback();
                        }
                    });
                }
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn chưa có vụ nuôi nào được kích hoạt'
                });
            }
        });
    }

    /**
     * Get All vụ theo user
     */
    private getSeasons = (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const season: Season = new Season();
        season.seasonServices.models.findAll({
            where: {
                userId: deToken.userId
            }
        }).then(ss => {
            if (ss.length > 0) {
                response.status(200).json({
                    success: true,
                    seasons: ss
                });

            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn chưa có vụ nuôi, vui lòng tạo một vụ để tiếp tục!'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                error: e,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    // private getSeasonById = (request: Request, response: Response, next: NextFunction) => {
    //     const { seasonId } = request.params;
    //     this.season.getById(seasonId).then((season: any) => {
    //         if (!season) {
    //             response.status(200).json({
    //                 success: false,
    //                 message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
    //             });
    //         } else {
    //             response.status(200).json({
    //                 success: true,
    //                 season
    //             });
    //         }
    //     });
    // }

    // // Get pond of id season
    // private getpondOfSeasonById = (request: Request, response: Response, next: NextFunction) => {
    //     const { seasonId } = request.body;
    //     this.seasonAndPondServices.models.findAll({
    //         include: [
    //             {
    //                 model: this.pondsServices.models,
    //                 as: ActionAssociateDatabase.SEASON_AND_POND_2_POND
    //             },
    //             {
    //                 model: this.stockingServices.models,
    //                 as: ActionAssociateDatabase.SEASON_AND_POND_2_STOCKING,
    //                 required: false,
    //                 include: [
    //                     {
    //                         model: this.stockingDetailsServices.models,
    //                         as: ActionAssociateDatabase.STOCKING_2_STOCKING_DETAILS,
    //                         include: [
    //                             {
    //                                 model: this.breedServives.models,
    //                                 as: ActionAssociateDatabase.STOCKING_DETAILS_2_BREED,
    //                                 required: false
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 model: this.seasonServices.models,
    //                 as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON
    //             }
    //         ],
    //         where: {
    //             seasonId
    //         }
    //     }).then((res) => {
    //         response.status(200).json({
    //             success: true,
    //             message: '',
    //             pondOfSeasonById: res
    //         });
    //     }).catch(e => {
    //         response.status(200).json({
    //             success: false,
    //             message: 'Lỗi, vui lòng thử lại sau.',
    //             error: e
    //         });
    //         throw e;
    //     });
    // }

    private updateSeason = (request: Request, response: Response, next: NextFunction) => {
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
}
