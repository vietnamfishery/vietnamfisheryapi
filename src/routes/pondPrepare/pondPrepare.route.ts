import { PondDiary } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondPrepareRoute extends BaseRoute {
    public static path = '/PondPrepare';
    private static instance: PondPrepareRoute;
    private pondDiary: PondDiary = new PondDiary();
    /**
     * @class PondPrepareRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondPrepareRoute.instance) {
            PondPrepareRoute.instance = new PondPrepareRoute();
        }
        return PondPrepareRoute.instance.router;
    }

    private init() {
        logger.info('[PondPrepareRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addPondPondPrepare);
        this.router.get('/gets', Authentication.isLogin, this.getPondPrepares);
        this.router.get('/get/:seasonId', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);
    }

    /**
     * Thêm lần chuẩn bị
     * @params [seasonAndPondId, pondprepareName, notes?, materialId]
     */
    private addPondPondPrepare = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private getPondPrepares = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private getById = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updatePondPrepare = (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
