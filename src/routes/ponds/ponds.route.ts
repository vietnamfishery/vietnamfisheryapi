import { Pond } from './../../components/ponds/ponds';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as jwt from 'jsonwebtoken';
import { defaultImage, secret, ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondRoute extends BaseRoute {
    public static path = '/ponds';
    private static instance: PondRoute;
    private pond: Pond = new Pond();
    /**
     * @class PondRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondRoute.instance) {
            PondRoute.instance = new PondRoute();
        }
        return PondRoute.instance.router;
    }

    private init() {
        logger.info('[PondRoute] Creating ping route.');
        this.router.post('/add', Authentication.isLogin, this.addPond);
        this.router.get('/gets', Authentication.isLogin, this.getPonds);
        this.router.get('/get/:pondId', Authentication.isLogin, this.getPondById);
        this.router.put('/update', Authentication.isLogin, this.updatePond);
    }

    private addPond = (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.INSERT;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, pondStatus } = request.body;
        this.pond.setPond(null, uuidv4(), decodetoken.userId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondStatus, images || defaultImage.pondImage, pondLatitude, pondLongitude);
        this.pond.upsert(action).then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thêm ao thành công!'
                });
            }
        }).catch(e => {
            if(e) {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                });
            }
        });
    }

    private getPonds = async (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.GET;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        this.pond.setUserId = decodetoken.userId;
        if(decodetoken) {
            const pondResult = await this.pond.gets(action).catch(e => {
                if(e) {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
                    });
                }
            });
            const endData = [];
            for(const e of pondResult) {
                e[`images`] = await GoogleDrive.delayGetFileById(e.images);
                endData.push(e);
            }
            response.status(200).json({
                success: true,
                ponds: endData
            });
        } else {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập!'
            });
        }
    }

    private getPondById = (request: Request, response: Response, next: NextFunction) => {
        const { pondId } = request.params;
        this.pond.getById(pondId).then((pond: any) => {
            if(!pond) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
                });
            } else {
                response.status(200).json({
                    success: true,
                    pond
                });
            }
        });
    }

    private updatePond = (request: Request, response: Response, next: NextFunction) => {
        const action = ActionServer.UPDATE;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, pondStatus } = request.body;
        if(!pondId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            this.pond.setPond(pondId, null, decodetoken.userId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondStatus, images || defaultImage.pondImage, pondLatitude, pondLongitude);
            this.pond.upsert(action).then((res: any) => {
                if(!res) {
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
}
