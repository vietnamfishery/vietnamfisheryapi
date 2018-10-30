import { NextFunction, Request, Response } from 'express';
import { logger, UserRolesServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User, UserRole } from '../../components';
import * as uuidv4 from 'uuid/v4';
// import { LoginHelper } from '../../helpers/login-helpers';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { ActionServer, secret, defaultImage } from '../../common';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';
/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class UserRoute extends BaseRoute {
    public static path = '/user';
    private static instance: UserRoute;
    private sequeliz: Sequelize = DBHelper.sequelize;
    private userRolesServices: UserRolesServices = new UserRolesServices();
    /**
     * @class UserRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UserRoute.instance) {
            UserRoute.instance = new UserRoute();
        }
        return UserRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[UserRoute] Creating ping route.');
        // add index page route
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/get', Authentication.isLogin, this.getUserInfo);
        this.router.get('/getWithUpdate', Authentication.isLogin, this.getUserInfoWithUpdate);
        this.router.put('/update', Authentication.isLogin, this.updateUserProfile);
        this.router.put('/update/password', Authentication.isLogin, this.updateUserPassword);
        this.router.post('/register/employee', Authentication.isLogin, this.regiterWithRoles);
    }

    private register = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { firstname, lastname, username, password } = request.body;
        const action: any = {
            method: request.method
        };
        user.setUserUUId = uuidv4();
        user.setFirstname = firstname;
        user.setLastname = lastname;
        user.setUsername = username;
        user.setPassword = password;
        user.setImages = defaultImage.userImage;
        user.register().then((value: any) => {
            if(value.errors) {
                response.status(200).json({
                    success: false,
                    message: 'Lỗi! Xin vui lòng thử lại.'
                });
            } else {
                response.json({
                    success: true,
                    message: 'Đăng ký thành công!'
                });
            }
        });
    }

    private login = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { username, password } = request.body;
        user.setUsername = username;
        user.setPassword = password;
        user.login().then((user$: any) => {
            if(!user$) {
                response.json({
                    success: false,
                    message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                });
            } else {
                Enscrypts.compare(user.getPassword, user$.password).then((isMatch: boolean) => {
                    if(isMatch) {
                        delete user$.password;
                        const token = Enscrypts.hashingSync('vietnamfishery', Enscrypts.getSaltSync(Math.floor((Math.random() * 12) + 1))) + '100%<3' + jwt.sign(user$, secret);
                        response.json({
                            success: true,
                            token,
                            user: user$
                        });
                    } else {
                        response.json({
                            success: false,
                            message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                        });
                    }
                }).catch(err => {
                    response.json({
                        success: false,
                        message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                    });
                });
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
            });
        });
    }

    private getUserInfo = (request: Request, response: Response) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const { userId, userUUId, firstname, lastname, username, password, birthday, email, phone, addressContact, town, district, province, status, images, createdBy, createdDate, updatedBy, updatedDate, isDeleted } = decodeToken;
        user.setUser(userId, userUUId, firstname, lastname, username, password, birthday, email, phone, addressContact, town, district, province, status, images, createdBy, createdDate, updatedBy, updatedDate, isDeleted);
        user.login().then((user$: any) => {
            if(!user$) {
                response.json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng thử lại!'
                });
            } else {
                delete user$[`password`];
                response.json(user$);
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng thử lại!'
            });
        });
    }

    private getUserInfoWithUpdate = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        user.setUsername = decodeToken.username;
        user.login().then((user$: any) => {
            if(!user$) {
                response.json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng thử lại!'
                });
            } else {
                delete user$[`password`];
                response.json(user$);
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng thử lại!'
            });
        });
    }

    private updateUserProfile = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { firstname, lastname, birthday, email, phone, town, district, province, images } = request.body;
        user.setUser(decodetoken.userId,null,firstname,lastname,decodetoken.username,null,birthday,email,phone,null,town,district,province,null,images,decodetoken.userUUId,undefined,undefined,undefined,undefined);
        if(request.files) {
            GoogleDrive.upload(request,response,next).then((data: any) => {
                if(data.fileId) {
                    user.setImages = data.fileId;
                    user.updateMyProfile().then(res => {
                        if(Array.isArray(res)) {
                            response.status(200).json({
                                success: true,
                                fileId: data.fileId,
                                message: 'Hồ sơ đã được cập nhật.'
                            });
                        } else {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                        }
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!',
                            error: e
                        });
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                }
            });
        } else {
            user.updateMyProfile().then(res => {
                if(Array.isArray(res)) {
                    response.status(200).json({
                        success: true,
                        message: 'Hồ sơ đã được cập nhật.'
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!',
                    error: e
                });
            });
        }
    }

    private updateUserPassword = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { oldPassword, newPassword } = request.body;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        user.setUsername = decodeToken.username;
        user.login().then((data: any) => {
            Enscrypts.compare(oldPassword, data.password).then((isMatch: boolean) => {
                if(!isMatch) {
                    response.status(200).json({
                        success: false,
                        message: 'Sai mật khẩu cũ!'
                    });
                } else {
                    user.setUserId = decodeToken.userId;
                    user.setPassword = newPassword;
                    user.changePassword().then((data$: any) => {
                        response.status(200).json({
                            success: true,
                            message: 'Thực hiện thành công!'
                        });
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra vui lòng thử lại!',
                            error: e
                        });
                    });
                }
            });
        });
    }

    regiterWithRoles = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const { username, password, firstname, lastname, roles } = request.body;
        user.setUser(null, uuidv4(), firstname, lastname, username, user.hashPassword(password));
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            user.userServices.models.create(user, {
                transaction: t
            }).then(async (u: any) => {
                const userRoles: UserRole = new UserRole();
                userRoles.setUserRoles(null, u.userId, decodeToken.userId, roles);
                this.userRolesServices.models.create(userRoles, {
                    transaction: t
                }).then(async (r: any) => {
                    response.status(200).json({
                        success: true,
                        message: 'Đăng ký thành công!'
                    });
                    t.commit();
                });
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Tên người dùng đã tồn tại, vui lòng kiểm tra và thử lại!'
                });
                t.rollback();
            });
        });
    }
}
