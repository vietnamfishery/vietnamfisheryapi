import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Province } from '../../components/province';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class ProvinceRoute extends BaseRoute {
    public static path = '/province';
    private static instance: ProvinceRoute;
    /**
     * @class ProvinceRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!ProvinceRoute.instance) {
            ProvinceRoute.instance = new ProvinceRoute();
        }
        return ProvinceRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[ProvinceRoute] Creating ping route.');
        // const loginHelper = new LoginHelper();
        // add index page route
        this.router.get('/', this.getAllProvince);
    }

    private getAllProvince(request: Request, response: Response) {
        const province = new Province();
        province.getAllProvince().then((res: any[]) => {
            response.status(200).json(res);
        });
    }
}
