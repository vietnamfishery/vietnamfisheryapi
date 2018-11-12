import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Material } from '../../components';
import { Transaction } from 'sequelize';
/**
 * @api {get} /materials Material Request customer object
 * @apiName Material
 * @apiGroup Material
 *
 * @apiSuccess {String} type Json Type.
 */
export class MaterialRoute extends BaseRoute {
    public static path = '/materials';
    private static instance: MaterialRoute;
    /**
     * @class MaterialRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!MaterialRoute.instance) {
            MaterialRoute.instance = new MaterialRoute();
        }
        return MaterialRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[MaterialRoute] Creating materials route.');

        // add index page route
        this.router.get('/gets', this.getAll);
    }

    /**
     * @class MaterialRoute
     * @method get
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const material: Material = new Material();
        material.materialServives.models.findAll().then(res => {
            response.status(200).json({
                success: true,
                message: '',
                res
            });
        });
    }
}
