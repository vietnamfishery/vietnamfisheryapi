import { Season } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer, ISearchOptions } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

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
    private season: Season = new Season();
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
        this.router.get('/get/:seasonId', Authentication.isLogin, this.getSeasonById);
        this.router.put('/update', Authentication.isLogin, this.updateSeason);
    }

    private addSeason = (request: Request, response: Response, next: NextFunction) => {
        const { seasonName } = request.body;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        this.season.setSeason(null, uuidv4(), decodeToken.userId, seasonName, 0);
        this.season.insert().then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thêm vụ thành công!',
                    season: res
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
    }

    private getSeasons = (request: Request, response: Response, next: NextFunction) => {
        const { pageSizes, pageIndex, sortBy, between, count } = request.headers;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const criteria: any = {
            userId: decodeToken.userId,
        };
        const options: any = {
            method: request.method,
            pageSizes,
            pageIndex,
            sortBy,
            between,
            count
        };
        this.season.gets(options, criteria).then(season => {
            if(season.length > 0) {
                response.status(200).json({
                    success: true,
                    season
                });

            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn chưa có ao, vui lòng tạo một ao để tiếp tục!'
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

    private getSeasonById = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId } = request.params;
        this.season.getById(seasonId).then((season: any) => {
            if(!season) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    season
                });
            }
        });
    }

    private updateSeason = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, seasonName, status } = request.body;
        if(!seasonId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            this.season.setSeason(seasonId, null, null, seasonName, status);
            this.season.update().then((res: any) => {
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
