import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { District } from '../../components/district';
import { User } from '../../components';
import * as uuidv4 from 'uuid/v4';
// import { LoginHelper } from '../../helpers/login-helpers';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import * as constants from '../../common';

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
        // log
        logger.info('[DistrictRoute] Creating ping route.');
        // const loginHelper = new LoginHelper();
        // add index page route
        this.router.get('/', this.getAllDistrict);
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
