import { NextFunction, Request, Response } from 'express';
import { logger, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { UserRole } from '../../components';
import { ActionAssociateDatabase } from '../../common';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';

/**
 * @api {get} /user/roles UserRoles Request customer object
 * @apiName UserRoles
 * @apiGroup UserRoles
 *
 * @apiSuccess {String} type Json Type.
 */
export class UserRoleRoute extends BaseRoute {
    public static path = '/user/roles';
    private static instance: UserRoleRoute;
    private userServives: UserServives = new UserServives();
    private sequeliz: Sequelize = DBHelper.sequelize;
    /**
     * @class UserRoleRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UserRoleRoute.instance) {
            UserRoleRoute.instance = new UserRoleRoute();
        }
        return UserRoleRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[UserRoleRoute] Creating user/roles route.');

        // add index page route
        this.router.get('/gets', Authentication.isLogin, this.getAllMyEmplyee);
        this.router.get('/gets/employees/pond', Authentication.isLogin, this.getEmployeeWithPondRoles);
        this.router.get('/get/:roleId', Authentication.isLogin, this.getRoleMyEmployee);
        this.router.put('/delete', Authentication.isLogin, this.deleteRoles);
        this.router.put('/upsert', Authentication.isLogin, this.upsertRoles);
        this.router.put('/change', Authentication.isLogin, this.changeRoles);
    }

    /**
     * @class UserRoleRoute
     * @method getWithToken
     * @param request {Request} The express Request object.
     * @param response {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private getAllMyEmplyee = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const userRole: UserRole = new UserRole();
        userRole.userRolesServices.models.findAll({
            where: {
                bossId: deToken.userId
            }
        }).then((employees: UserRole[]) => {
            if (employees.length === 0) {
                response.status(200).json({
                    success: false,
                    message: 'Bạn chưa có nhân viên nào, hãy hãy thêm nhân viên và trở lại sau.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    employees
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại.'
            });
        });
    }

    /**
     * @class UserRoleRoute
     * @method getWithParams
     * @param request {Request} The express Request object.
     * @param response {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private getRoleMyEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const userRole: UserRole = new UserRole();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { roleId } = request.params;
        userRole.userRolesServices.getById(roleId)
            .then((role: UserRole) => {
                if (role) {
                    response.status(200).json({
                        success: true,
                        message: '',
                        role
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Không tìm thấy danh mục phân quyền này.'
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
                });
            });
    }

    /**
     * @class UserRoleRoute
     * @method getWithHeader
     * @headers {
     *      pondRole: {{ roledId }},
     *      storageRole: {{ rolesId }}
     * }
     * @param request {Request} The express Request object.
     * @param response {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    private getEmployeeWithPondRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const userRole: UserRole = new UserRole();
        this.userServives.models.findAll({
            include: [
                {
                    model: userRole.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLE_USER,
                    where: {
                        bossId: deToken.userId,
                        roles: 1
                    }
                }
            ]
        }).then((employees: any) => {
            if (employees.length > 0) {
                response.status(200).json({
                    success: true,
                    message: '',
                    employees
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn chưa có nhân viên có quyền quản lý ao, phân quyền và thử lại sau.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau.'
            });
        });
    }

    private deleteRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { rolesId } = request.body;
        const userRole: UserRole = new UserRole();
        userRole.userRolesServices.models.destroy({
            where: {
                rolesId
            }
        }).then((res: any) => {
            response.status(200).json({
                success: true,
                message: 'Thu hồi thành công!'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau!'
            });
        });
    }

    private upsertRoles = async (request: Request, response: Response, next: NextFunction) => {
        const userRole: UserRole = new UserRole();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId, roles, isDeleted } = request.body;
        userRole.setBossId = deToken.userId;
        userRole.setUserId = userId;
        userRole.setRoles = roles;
        userRole.setIsDeleted = isDeleted;
        userRole.userRolesServices.models.upsert(userRole.getFields(), {
            fields: ['roles', 'isDeleted'],
            returning: true
        }).then((res: any) => {
            response.status(200).json({
                success: true,
                message: 'Thao tác thành công.'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi đường truyền, vui lòng thử lại sau.'
            });
        });
    }

    private changeRoles = async (request: Request, response: Response, next: NextFunction) => {
        const { rolesId, userId, roles, isDeleted } = request.body;
        let userRole: UserRole = new UserRole();
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            userRole = new UserRole();
            userRole.setRolesId = rolesId;
            userRole.setIsDeleted = 1;
            userRole.userRolesServices.models.upsert(userRole.getFields(), {
                fields: ['roles', 'isDeleted'],
                returning: true,
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau!'
                });
                t.rollback();
            }).then(async (result: any) => {
                const token: string = request.headers.authorization;
                const deToken: any = Authentication.detoken(token);
                userRole = new UserRole();
                userRole.setBossId = deToken.userId;
                userRole.setUserId = userId;
                userRole.setRoles = roles;
                userRole.setIsDeleted = 0;
                userRole.userRolesServices.models.upsert(userRole.getFields(), {
                    fields: ['roles', 'isDeleted'],
                    returning: true,
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau!'
                    });
                    t.rollback();
                }).then(async (res: any) => {
                    response.status(200).json({
                        success: true,
                        message: 'Thực hiện thành công.'
                    });
                    t.commit();
                });
            });
        });
    }
}
