import { Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Ward } from '../../components/ward';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class WardRoute extends BaseRoute {
    public static path = '/ward';
    private static instance: WardRoute;
    /**
     * @class WardRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!WardRoute.instance) {
            WardRoute.instance = new WardRoute();
        }
        return WardRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[WardRoute] Creating ward route.');

        // add route
        this.router.get('/', this.getAllWard);

        // log endpoints
        this.logEndpoints(this.router, WardRoute.path);
    }

    private getAllWard = async (request: Request, response: Response) => {
        const ward = new Ward();
        if (!request.headers.districtid) {
            ward.getAllWard().then((res: any[]) => {
                response.status(200).json(res);
            });
        } else {
            ward.getDistrictByDistrictId(request.headers.districtid).then((res: any[]) => {
                response.status(200).json(res);
            });
        }
    }
}
