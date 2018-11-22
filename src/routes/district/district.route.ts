import { Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { District } from '../../components/district';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class DistrictRoute extends BaseRoute {
    public static path = '/district';
    private static instance: DistrictRoute;
    /**
     * @class DistrictRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!DistrictRoute.instance) {
            DistrictRoute.instance = new DistrictRoute();
        }
        return DistrictRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[DistrictRoute] Creating district route.');

        // add route
        this.router.get('/', this.getAllDistrict);

        // log enpoint
        this.logEndpoints(this.router, DistrictRoute.path);
    }

    private getAllDistrict(request: Request, response: Response) {
        const district = new District();
        if (!request.headers.provinceid) {
            district.getAllDistrict().then((res: any[]) => {
                response.status(200).json(res);
            });
        } else {
            district.getDistrictByProvinceId(request.headers.provinceid).then((res: any[]) => {
                response.status(200).json(res);
            });
        }
    }
}
