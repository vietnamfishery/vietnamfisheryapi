import { NextFunction, Request, Response } from 'express';
import * as httpStatusCode from 'http-status-codes';

import { BaseRoute } from './BaseRoute';
import { logger } from '../services';
import { PingRoute } from './ping';
import { UserRoute } from './users';
import { UploadRoute } from './upload';
import { GetFileRoute } from './getFile';
import { ProvinceRoute } from './province';
import { DistrictRoute } from './district';
import { WardRoute } from './ward';
import { PondRoute } from './ponds';
import { SeasonRoute } from './seasons';
import { PondPrepareRoute } from './pondPrepare';
import { PondPrepareDetailRoute } from './pondPrepareDetail';
import { StorageRoute } from './storages';

/**
 * / route
 *
 * @class User
 */
export class ApiRoutes extends BaseRoute {
    private static instance: ApiRoutes;

    /**
     * @class ApiRoutes
     * @constructor
     */
    private constructor () {
        super();
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
        this.router.use(PingRoute.path, PingRoute.router);
        this.router.use(UserRoute.path, UserRoute.router);
        this.router.use(UploadRoute.path, UploadRoute.router);
        this.router.use(GetFileRoute.path, GetFileRoute.router);
        this.router.use(ProvinceRoute.path, ProvinceRoute.router);
        this.router.use(DistrictRoute.path, DistrictRoute.router);
        this.router.use(WardRoute.path, WardRoute.router);
        this.router.use(PondRoute.path, PondRoute.router);
        this.router.use(SeasonRoute.path, SeasonRoute.router);
        this.router.use(PondPrepareRoute.path, PondPrepareRoute.router);
        this.router.use(PondPrepareDetailRoute.path, PondPrepareDetailRoute.router);
        this.router.use(StorageRoute.path, StorageRoute.router);
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
