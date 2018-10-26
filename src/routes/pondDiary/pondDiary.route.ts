import { PondDiary } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondDiaryRoute extends BaseRoute {
    public static path = '/PondDiarys';
    private static instance: PondDiaryRoute;
    private pondDiary: PondDiary = new PondDiary();
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
        logger.info('[PondDiaryRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addPondDiary);
        this.router.get('/gets', Authentication.isLogin, this.getPondDiaries);
        this.router.get('/get/:seasonId', Authentication.isLogin, this.getPondDiaryById);
        this.router.put('/update', Authentication.isLogin, this.updatePondDiary);
    }

    private addPondDiary = (request: Request, response: Response, next: NextFunction) => {
        const { seasonAndPondId, fisheryQuantity, healthOfFishery, pondVolume, diedFishery } = request.body;
        this.pondDiary.setPonddiary(null, uuidv4(), seasonAndPondId, fisheryQuantity, healthOfFishery, pondVolume, diedFishery);
        this.pondDiary.insert().then((res: any) => {
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
    }

    /**
     * Get theo tháng, theo user join từ vự
     * @param request
     * @param response
     * @param next
     */
    private getPondDiaries = async (request: Request, response: Response, next: NextFunction) => {
        // const action = ActionServer.GET;
        // this.pondDiary.setPondId = request.params.pondId;
        // this.pondDiary.gets(action).then(season => {
        //     response.status(200).json({
        //         success: true,
        //         season
        //     });
        // }).catch(e => {
        //     response.status(200).json({
        //         success: false,
        //         error: e,
        //         message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
        //     });
        // });
    }

    /**
     * Get theo lần ghi
     */
    private getPondDiaryById = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId } = request.params;
        this.pondDiary.getById(seasonId).then((season: any) => {
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

    /**
     * get theo ngày
     */
    private getPondDiaryByDay = async (request: Request, response: Response, next: NextFunction) => {
        //
    }

    /**
     * Sửa đổi
     */
    private updatePondDiary = (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
