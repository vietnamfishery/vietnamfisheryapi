import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { CustomStream } from '../../lib';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class UploadRoute extends BaseRoute {
    public static path = '/uploads';
    private static instance: UploadRoute;
    /**
     * @class UploadRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UploadRoute.instance) {
            UploadRoute.instance = new UploadRoute();
        }
        return UploadRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[UploadRoute] Creating upload route.');
        this.router.post('/image', GoogleDrive.upload);
    }
}
