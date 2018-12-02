import { NextFunction, Request, Response } from 'express';
import { logger, UserServives, UserRolesServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { UserRole } from '../../components';
import { Transaction, FindOptions } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';

/**
 * @api {get} /user/roles UserRoles Request customer object
 * @apiName UserRoles
 * @apiGroup UserRoles
 *
 * @apiSuccess {String} type Json Type.
 */
export class UserRoleRoute extends BaseRoute {
    public static path = '/userRoles';
    private static instance: UserRoleRoute;
    private userServives: UserServives = new UserServives();
    private userRolesServices: UserRolesServices = new UserRolesServices();
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
        // log message
        logger.info('[UserRoleRoute] Creating roles of user route.');

        // add route
        this.router.get('/gets', Authentication.isLogin, this.getAllMyEmployee);
        this.router.get('/get/:roleId', Authentication.isLogin, this.getRoleByRoleId);
        this.router.put('/delete', Authentication.isLogin, this.deleteRoles);
        this.router.put('/upsert', Authentication.isLogin, this.upsertRoles);
        this.router.put('/change', Authentication.isLogin, this.changeRoles);

        // log endpoints
        this.logEndpoints(this.router, UserRoleRoute.path);
    }

    /**
     * Get Employees with boss of farm
     * @method GET
     * @param request.headers
     * ```
     *      {
     *          authorization: "token",
     *          roles: '' || '1' || '2'
     *      }
     * ```
     */
    private getAllMyEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const { roles } = request.headers;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        // create query
        const query: FindOptions<any> = {
            include: [],
            where: {}
        };

        // get userInfo
        const userInfo: any = {
            model: this.userServives.models,
            as: ActionAssociateDatabase.USER_ROLES_2_USER,
            attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'createdDate', 'createdBy']
        };
        query.include.push(userInfo);

        // tmp where
        // let where: any = {};
        if (isBoss) {
            if (roles) {
                // get with roles
                query.where = {
                    bossId: userId,
                    roles // 1 is pond using role
                };
            } else {
                // get without roles
                query.where = {
                    bossId: userId
                };
            }
        } else {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        }
        this.userRolesServices.models.findAll(query).then((res: any) => {
            if (res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    employees: res
                });
            } else {
                if (roles === '1') {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn không có nhân viên quản lý AO nào cả.'
                    });
                } else if (roles === '2') {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn không có nhân viên quản lý KHO nào cả.'
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn không có nhân viên nào cả. Vui lòng thêm tài khoản cho nhân viên và thử lại sau.'
                    });
                }
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
            });
        });
    }

    /**
     * Get Role by roleId
     * @method GET
     * @param request.params {Request} The express Request object.
     */
    private getRoleByRoleId = async (request: Request, response: Response, next: NextFunction) => {
        const { roleId } = request.params;
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if(!isBoss) {
            return response.status(200).json({
                success: false,
                message: 'Dừng lại! Truy cập là trái phép.'
            });
        }
        this.userRolesServices.models.findById(roleId).then((role: UserRole) => {
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

    private deleteRoles = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const { rolesId } = request.body;
        this.userRolesServices.models.destroy({
            where: {
                bossId: userId,
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
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId, roles, isDeleted } = request.body;
        userRole.setBossId = deToken.userId;
        userRole.setUserId = userId;
        userRole.setRoles = roles;
        userRole.setIsDeleted = isDeleted;
        const main: any = await this.userRolesServices.models.findAll({
            where: {
                userId,
                bossId: deToken.userId
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
        if(!main) {
            return response.status(200).json({
                success: false,
                message: 'Bạn không có quyền thao tác này!'
            });
        }
        userRole.userRolesServices.models.upsert(userRole.getFields(), {
            fields: ['roles', 'isDeleted'],
            returning: true
        }).then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: 'Thao tác thành công.'
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Thất bại, thử lại sau.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau.'
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
                const token: string = request.headers.authorization.split(' ')[1];
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
