import { Pond, UserRole } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { defaultImage } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondUserRolesRoute extends BaseRoute {
    public static path = '/pondUserRoles';
    private static instance: PondUserRolesRoute;
    /**
     * @class PondUserRolesRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondUserRolesRoute.instance) {
            PondUserRolesRoute.instance = new PondUserRolesRoute();
        }
        return PondUserRolesRoute.instance.router;
    }

    private init() {
        logger.info('[PondUserRolesRoute] Creating ping route.');
        // this.router.post('/add', Authentication.isLogin, this.addPond);
        // this.router.get('/gets', Authentication.isLogin, this.getPonds);
        // this.router.get('/get/:pondUserRolesId', Authentication.isLogin, this.getPondById);
        // this.router.put('/update', Authentication.isLogin, this.updatePond);
    }

    private addPond = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, status, employee } = request.body;
        pond.setPond(null, uuidv4(), decodetoken.userId, pondName, pondArea, pondDepth, createCost, status, images || defaultImage.pondImage, pondLatitude, pondLongitude, pondCreatedDate);
        pond.insert(employee).then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thêm ao thành công!',
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
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        pond.pondsServices.get({
            userId: decodetoken.userId
        }).then((res: any) => {
            response.status(200).json(res);
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    private getPondById = (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const { pondId } = request.params;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        pond.getById(pondId, decodetoken.userId).then((pond$: any) => {
            if(!pond$) {
                response.status(200).json({
                    success: false,
                    message: 'Không tìm thấy ao, xin vui lòng kiểm tra lại!'
                });
            } else {
                response.status(200).json(pond$);
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập api này!'
            });
        });
    }

    // private updatePond = (request: Request, response: Response, next: NextFunction) => {
    //     const action = ActionServer.UPDATE;
    //     const token: string = request.headers.authorization.split('100%<3')[1];
    //     const decodetoken: any = Authentication.detoken(token);
    //     const { pondId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, pondStatus } = request.body;
    //     if(!pondId) {
    //         response.status(200).json({
    //             success: false,
    //             message: 'Hành động không được phép, vui lòng thử lại sau!'
    //         });
    //     } else {
    //         this.pond.setPond(pondId, null, decodetoken.userId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondStatus, images || defaultImage.pondImage, pondLatitude, pondLongitude);
    //         this.pond.upsert(action).then((res: any) => {
    //             if(!res) {
    //                 response.status(200).json({
    //                     success: false,
    //                     message: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!'
    //                 });
    //             } else {
    //                 response.status(200).json({
    //                     success: true,
    //                     message: 'Cập nhật thành công!'
    //                 });
    //             }
    //         });
    //     }
    // }
}
