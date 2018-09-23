import { NextFunction, Request, Response } from 'express';
import * as httpStatusCode from 'http-status-codes';

import { BaseRoute } from './BaseRoute';
import { logger } from '../services';
import { PingRoute } from './ping';
import { UserRoute } from './users';
import { IModelsDB } from '../interfaces';

/**
 * / route
 *
 * @class User
 */
export class ApiRoutes extends BaseRoute {
    // public static path = '/';
    private static instance: ApiRoutes;

    /**
     * @class ApiRoutes
     * @constructor
     */
    private constructor (
        models: IModelsDB = {
            name: null,
            model: null
        }
    ) {
        super(models);
        // this.get = this.get.bind(this);
        this.init();
    }

    /**
     * @class ApiRoute
     * @method getRouter
     * @returns {Router}
     */
    static get router () {
        if (!this.instance) {
            this.instance = new ApiRoutes();
        }
        return this.instance.router;
    }

    /**
     * @class ApiRoute
     * @method init
     */
    private init () {
        // log
        logger.info('[ApiRoute] Creating api routes.');

        // add index page route
        this.router.get('/', this.get);
        // this.router.use(PingRoute.path, PingRoute.router);
        this.router.use(UserRoute.path, UserRoute.router);
    }

    /**
     * @class ApiRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private get = async (req: Request, res: Response, next: NextFunction) => {
        res.status(httpStatusCode.OK).render('index');
    }
}
