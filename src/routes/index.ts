import { NextFunction, Request, Response } from 'express';
import * as httpStatusCode from 'http-status-codes';
import { colorCli } from '../config';

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
import { BreedRoute } from './breed';
import { StockingRoute } from './stocking';
import { DiedFisheryRoute } from './diedFishery';
import { GrowthsRoute } from './growths';
import { HarvestRoute } from './harvest';
import { UserRoleRoute } from './userRoles';
import { PondUserRolesRoute } from './pondUserRoles';
import { MaterialRoute } from './material';
import { SeasonAndPondRoute } from './seasonAndPond';
import { UsingFoodRoute } from './usingFood';
import { PondDiaryRoute } from './pondDiary';
import { TakeCareRoute } from './takeCare';
import { UsingVeterinaryRoute } from './usingVeterinary';
import { CostsRoute } from './costs';

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
        // console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
        console.log(`\n${ colorCli.YELLOW }###################################################\n${ colorCli.YELLOW }##         WELCOME TO VIETNAM FISHERY API        ##\n${ colorCli.YELLOW }##             Creating api routes...            ##\n${ colorCli.YELLOW }###################################################\n`);

        // add index page route
        this.router.get('/', this.get);
        this.router.use(BreedRoute.path, BreedRoute.router);
        this.router.use(CostsRoute.path, CostsRoute.router);
        this.router.use(DiedFisheryRoute.path, DiedFisheryRoute.router);
        this.router.use(DistrictRoute.path, DistrictRoute.router);
        this.router.use(GetFileRoute.path, GetFileRoute.router);
        this.router.use(GrowthsRoute.path, GrowthsRoute.router);
        this.router.use(HarvestRoute.path, HarvestRoute.router);
        this.router.use(MaterialRoute.path, MaterialRoute.router);
        // this.router.use(PingRoute.path, PingRoute.router);
        this.router.use(PondDiaryRoute.path, PondDiaryRoute.router);
        this.router.use(PondPrepareRoute.path, PondPrepareRoute.router);
        this.router.use(PondPrepareDetailRoute.path, PondPrepareDetailRoute.router);
        this.router.use(PondRoute.path, PondRoute.router);
        this.router.use(PondUserRolesRoute.path, PondUserRolesRoute.router);
        this.router.use(ProvinceRoute.path, ProvinceRoute.router);
        this.router.use(SeasonAndPondRoute.path, SeasonAndPondRoute.router);
        this.router.use(SeasonRoute.path, SeasonRoute.router);
        this.router.use(StockingRoute.path, StockingRoute.router);
        this.router.use(StorageRoute.path, StorageRoute.router);
        this.router.use(TakeCareRoute.path, TakeCareRoute.router);
        this.router.use(UploadRoute.path, UploadRoute.router);
        this.router.use(UserRoleRoute.path, UserRoleRoute.router);
        this.router.use(UserRoute.path, UserRoute.router);
        this.router.use(UsingFoodRoute.path, UsingFoodRoute.router);
        this.router.use(UsingVeterinaryRoute.path, UsingVeterinaryRoute.router);
        this.router.use(WardRoute.path, WardRoute.router);

        // log total endpoint
        console.log(`\n${ colorCli.CYAN }###################################################\n${ colorCli.CYAN }##        Total endpoints of api is: ${ colorCli.YELLOW }${ BaseRoute.countEndpoints }${ colorCli.CYAN }         ##\n${ colorCli.CYAN }###################################################\n`);
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
