import { PondUserRole } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, PondUserRolesServices, UserRolesServices, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { ActionAssociateDatabase } from '../../common';

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
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private userServives: UserServives = new UserServives();
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
        // log message
        logger.info('[PondUserRolesRoute] Creating role pond of user route.');

        // add route
        this.router.post('/add', Authentication.isLogin, this.addPondRoles);
        this.router.get('/gets', Authentication.isLogin, this.getUserManageWithPond);
        this.router.put('/update', Authentication.isLogin, this.updateRoles);
        this.router.put('/delete', Authentication.isLogin, this.deleteRoles);

        // log endpoints
        this.logEndpoints(this.router, PondUserRolesRoute.path);
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

    private getUserManageWithPond = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if(!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        } else {
            this.userRolesServices.models.findAll({
                include: [
                    {
                        model: this.userServives.models,
                        as: ActionAssociateDatabase.USER_ROLES_2_USER,
                        include: [
                            {
                                model: this.pondUserRolesServices.models,
                                as: ActionAssociateDatabase.USER_2_POND_USER_ROLE,
                                required: false
                            }
                        ],
                        attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username',  'createdDate', 'createdBy']
                    }
                ],
                where: {
                    bossId: userId,
                    roles: 1
                }
            }).then((res: any) => {
                if(!res.length) {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn không có nhân viên vào.',
                        employees: res
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        message: '',
                        employees: res
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
                });
            });
        }
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
