import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { GoogleDrive } from '../../googleAPI/drive.google';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class GetFileRoute extends BaseRoute {
    public static path = '/getFile';
    private static instance: GetFileRoute;
    /**
     * @class GetFileRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!GetFileRoute.instance) {
            GetFileRoute.instance = new GetFileRoute();
        }
        return GetFileRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[GetFileRoute] Creating upload route.');
        this.router.get('/image/:fileId', GoogleDrive.getFile);
    }
}
