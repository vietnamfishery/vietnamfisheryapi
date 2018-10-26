import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { SeasonsAndPond } from '../../components';
/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class SeasonAndPondRoute extends BaseRoute {
    public static path = '/seasonAndPond';
    private static instance: SeasonAndPondRoute;
    /**
     * @class SeasonAndPondRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!SeasonAndPondRoute.instance) {
            SeasonAndPondRoute.instance = new SeasonAndPondRoute();
        }
        return SeasonAndPondRoute.instance.router;
    }

    private init() {
        logger.info('[SeasonAndPondRoute] Creating ping route.');
        this.router.post('/add', this.addSeasonAndPond);
        this.router.put('/update', this.updateSeasonAndPond);
    }

    /**
     * @class SeasonAndPondRoute
     * @method get
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private addSeasonAndPond = async (request: Request, response: Response) => {
        const seasonsAndPond: SeasonsAndPond = new SeasonsAndPond();
        const { seasonId, pondId } = request.body;
        seasonsAndPond.setSeasonId = seasonId;
        seasonsAndPond.setPondId = pondId;

        seasonsAndPond.insert().then((res: any) => {
            if (!res) {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, không thể thực hiện yêu cầu, vui long thử lại sau!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Phân quyền thành công.'
                });
            }
        });
    }

    private updateSeasonAndPond = async (request: Request, response: Response) => {
        const seasonsAndPond: SeasonsAndPond = new SeasonsAndPond();
        const { seasonAndPondId, seasonId, pondId } = request.body;
        seasonsAndPond.setSeasonAndPondId = seasonAndPondId;
        seasonsAndPond.setSeasonId = seasonId;
        seasonsAndPond.setPondId = pondId;

        seasonsAndPond.update().then((res: any) => {
            if (!res) {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, không thể thực hiện yêu cầu, vui long thử lại sau!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Phân quyền thành công.'
                });
            }
        });
    }
}
