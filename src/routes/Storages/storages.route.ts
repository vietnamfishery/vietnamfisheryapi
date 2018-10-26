import { Storage } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @apiSuccess {String} type Json Type.
 */
export class StorageRoute extends BaseRoute {
    public static path = '/storages';
    private static instance: StorageRoute;
    /**
     * @class StorageRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!StorageRoute.instance) {
            StorageRoute.instance = new StorageRoute();
        }
        return StorageRoute.instance.router;
    }

    private init() {
        logger.info('[StorageRoute] Creating storage route.');
        this.router.post('/add', Authentication.isLogin, this.addStorage);
        this.router.get('/gets', Authentication.isLogin, this.getStorages);
        this.router.get('/get/:storageId', Authentication.isLogin, this.getStorageById);
        this.router.put('/update', Authentication.isLogin, this.updateStorage);
    }

    private addStorage = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private getStorages = async (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private getStorageById = (request: Request, response: Response, next: NextFunction) => {
        //
    }

    private updateStorage = (request: Request, response: Response, next: NextFunction) => {
        //
    }
}
