import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Pond } from '../../components';
import { PondUserRolesServices, UserRolesServices, UserServives, SeasonServices, PondsServices } from '../../services';
/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PingRoute extends BaseRoute {
    public static path = '/ping';
    private static instance: PingRoute;
    /**
     * @class PingRoute
     * @constructor
     */
    private constructor() {
        super();
        this.get = this.get.bind(this);
        this.init();
    }

    static get router() {
        if (!PingRoute.instance) {
            PingRoute.instance = new PingRoute();
        }
        return PingRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[PingRoute] Creating ping route.');

        // add index page route
        this.router.get('/', this.get);
        this.router.get('/all', this.getAll);
        this.router.get('/pr', this.getpr);
        this.router.get('/ura', this.getura);
        this.router.get('/UserAndSeason', this.userAndSeason);
        this.router.get('/SeasonWithUser', this.seasonWithUser);
    }

    /**
     * @class PingRoute
     * @method get
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private async get(req: Request, res: Response, next: NextFunction) {
        const pond = new Pond();
        pond.test().then(res$ => {
            res.json({ res$ });
        });
    }

    private async getAll(req: Request, res: Response, next: NextFunction) {
        const pondsServices: PondsServices = new PondsServices();
        pondsServices.testAll().then(res$ => {
            res.json({ res$ });
        });
    }

    private async getpr(req: Request, res: Response, next: NextFunction) {
        const pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
        pondUserRolesServices.testpr().then(res$ => {
            res.json({ res$ });
        });
    }

    private async getura(req: Request, res: Response, next: NextFunction) {
        const userRolesServices: UserRolesServices = new UserRolesServices();
        userRolesServices.testUserAssociate().then(res$ => {
            res.json({ res$ });
        });
    }

    private async userAndSeason(req: Request, res: Response, next: NextFunction) {
        const userServives: UserServives = new UserServives();
        userServives.getSeasonWithUser().then(res$ => {
            res.json({ res$ });
        });
    }

    private async seasonWithUser(req: Request, res: Response, next: NextFunction) {
        const seasonServices: SeasonServices = new SeasonServices();
        seasonServices.seasonWithUser().then(res$ => {
            res.json({ res$ });
        });
    }
}
