import { Storages } from '../../components';
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
    private storage: Storages = new Storages();
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
        const action = ActionServer.INSERT;
        const { unitName, unitType, description } = request.body;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.storage.setStorages(null, uuidv4(), decodetoken.userId, unitName, unitType, description);
        this.storage.upsert(action).then((res: any) => {
            if (res) {
                response.status(200).json({
                    success: true,
                    message: 'Thêm vật phẩm thành công!'
                });
            }
        }).catch(e => {
            if (e) {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                });
            }
        });
    }

    private getStorages = async (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.GET;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.storage.setUserId = decodetoken.userId;
        this.storage.gets(action).then((storages: any[]) => {
            if (!storages) {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    storages
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                error: e,
                message: 'Không tìm thấy!'
            });
        });
    }

    private getStorageById = (request: Request, response: Response, next: NextFunction) => {
        const { storageId } = request.params;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.storage.setUserId = decodetoken.userId;
        this.storage.getById(storageId).then((storage: any) => {
            if (!storage) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy vật phẩm, xin vui lòng kiểm tra lại!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    storage
                });
            }
        });
    }

    private updateStorage = (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.UPDATE;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { unitName, unitType, description } = request.body;
        this.storage.setStorages(null, uuidv4(), decodetoken.userId, unitName, unitType, description);
        this.storage.upsert(action).then((res: any) => {
            if (!res) {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Cập nhật thành công!'
                });
            }
        });
    }
}
