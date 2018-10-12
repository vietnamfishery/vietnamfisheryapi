import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Province } from '../../components/province';
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
