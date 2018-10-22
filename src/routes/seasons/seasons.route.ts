import { Season } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage, ActionServer } from '../../common';
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
        this.router.get('/get/:pondId', Authentication.isLogin, this.getSeasonById);
        this.router.put('/update', Authentication.isLogin, this.updateSeason);
    }

    private addSeason = (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.INSERT;
        const { pondId, seasonName } = request.body;
        this.season.setSeason(null, uuidv4(), pondId, seasonName);
        this.season.upsert(action).then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thêm ao thành công!'
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
        const action = ActionServer.GET;
        this.season.setPondId = request.params.pondId;
        this.season.gets(action).then(season => {
            response.status(200).json({
                success: true,
                season
            });
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
        const action = ActionServer.UPDATE;
        const { seasonId, pondId, seasonName } = request.body;
        if(!seasonId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            this.season.setSeason(seasonId, null, pondId, seasonName);
            this.season.upsert(action).then((res: any) => {
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
