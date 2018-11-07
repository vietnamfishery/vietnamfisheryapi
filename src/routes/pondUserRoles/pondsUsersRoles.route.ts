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
        this.router.post('/add', Authentication.isLogin, this.addPondRoles);
        this.router.get('/gets', Authentication.isLogin, this.getRoles);
        this.router.put('/update', Authentication.isLogin, this.updateRoles);
        this.router.put('/delete', Authentication.isLogin, this.deleteRoles);
    }

    private addPondRoles = (request: Request, response: Response, next: NextFunction) => {
        const pondUserRole: PondUserRole = new PondUserRole();
        const { userId, pondId } = request.body;
        pondUserRole.setUserId = (userId as number) - 0;
        pondUserRole.setPondId = pondId;
        pondUserRole.pondUserRolesServices.models.create(pondUserRole.getFields(pondUserRole))
        .then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thao tác thành công!',
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Người đã có quyền trên ao này.'
                });
            }
        }).catch(e => {
            if(e) {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng kiểm tra và thử lại!'
                });
            }
        });
    }

    private getRoles = async (request: Request, response: Response, next: NextFunction) => {
        const pond: Pond = new Pond();
        const token: string = request.headers.authorization;
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
        const token: string = request.headers.authorization;
        const { pondUserRolesId, pondId } = request.body;
        if(!pondId && !pondUserRolesId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không được phép, vui lòng thử lại sau!'
            });
        } else {
            pondUserRole.setPondUserRolesId = pondUserRolesId;
            pondUserRole.setPondId = pondId;
            pondUserRole.pondUserRolesServices.models.update(pondUserRole.getFields(pondUserRole), {
                where: {
                    pondUserRolesId
                }
            }).then((res: any) => {
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
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Nhân viên đã có quyền thao tác với ao này, vui lòng kiểm tra và thử lại sau!'
                });
            });
        }
    }

    private deleteRoles = (request: Request, response: Response, next: NextFunction) => {
        const pondUserRole: PondUserRole = new PondUserRole();
        const token: string = request.headers.authorization;
        const { pondUserRolesId } = request.body;
        pondUserRole.setIsDeleted = 1;
        pondUserRole.pondUserRolesServices.models.destroy({
            where: {
                pondUserRolesId
            }
        }).then(res => {
            response.status(200).json({
                success: true,
                message: 'Thao tác thành công!'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau!'
            });
        });
    }
}
