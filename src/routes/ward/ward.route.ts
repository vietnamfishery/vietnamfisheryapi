import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Ward } from '../../components/ward';
import { User } from '../../components/users/users';
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
        // log
        logger.info('[WardRoute] Creating ping route.');
        // const loginHelper = new LoginHelper();
        // add index page route
        this.router.get('/', this.getAllWard);
    }

    private getAllWard(request: Request, response: Response) {
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
