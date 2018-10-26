import { Pond, UserRole, PondUserRole } from '../../components';
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
        this.router.post('/add', Authentication.isLogin, this.addRoles);
        this.router.get('/gets', Authentication.isLogin, this.getRoles);
        this.router.put('/update', Authentication.isLogin, this.updateRoles);
        // this.router.get('/get/:pondUserRolesId', Authentication.isLogin, this.getPondById);
    }

    private addRoles = (request: Request, response: Response, next: NextFunction) => {
        const pondUserRole: PondUserRole = new PondUserRole();
        const { userId, pondId } = request.body;
        pondUserRole.setUserId = userId;
        pondUserRole.setPondId = pondId;
        pondUserRole.insert().then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Phân quyền thành công!',
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

    private getRoles = async (request: Request, response: Response, next: NextFunction) => {
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

    private updateRoles = (request: Request, response: Response, next: NextFunction) => {
        const pondUserRole: PondUserRole = new PondUserRole();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const {pondUserRolesId, userId, pondId } = request.body;
        if(!pondId || !userId || pondUserRolesId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            pondUserRole.setPondUserRolesId = pondUserRolesId;
            pondUserRole.setUserId = userId;
            pondUserRole.setPondId = pondId;
            pondUserRole.update().then((res: any) => {
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
}
