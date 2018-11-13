import { PondDiary } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, SeasonServices, SeasonAndPondServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';

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
    private seasonServices: SeasonServices = new SeasonServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
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
        this.router.put('/update', Authentication.isLogin, this.updatePondDiary);
    }

    private addPondDiary = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes } = request.body;
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
            pondDiary.setPonddiary(null, uuidv4(), seasonAndPond.seasonAndPondId, fisheryQuantity, healthOfFishery, pondVolume, diedFishery, notes);
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
        //
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
