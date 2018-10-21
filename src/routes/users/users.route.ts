import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/Users';
import * as uuidv4 from 'uuid/v4';
// import { LoginHelper } from '../../helpers/login-helpers';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { ActionServer, secret, defaultImage } from '../../common';
import { Authentication } from '../../helpers/login-helpers';
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
    private user: User = new User();
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
        this.router.post('/register', this.signup);
        this.router.post('/login', this.login);
        this.router.get('/get', Authentication.isLogin, this.getUserInfo);
        this.router.put('/update', Authentication.isLogin, this.updateUserProfile);
        this.router.put('/update/password', Authentication.isLogin, this.updateUserPassword);
        // this.router.get('/login-ui', function(req, res) {
        //     res.redirect((req.headers as any).origin);
        // });
    }

    private signup = (req: Request, res: Response, next: NextFunction) => {
        const action = ActionServer.REGISTER;
        const { firstname, lastname, username, password } = req.body;
        this.user.setUserUUId = uuidv4();
        this.user.setFirstname = firstname;
        this.user.setLastname = lastname;
        this.user.setUsername = username;
        this.user.setPassword = password;
        this.user.setImages = defaultImage.userImage;
        this.user.register(action).then((value: any) => {
            if(value.errors) {
                res.status(200).json({
                    success: false,
                    message: 'Lỗi! Xin vui lòng thử lại.'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Đăng ký thành công!'
                });
            }
        });
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        const action = ActionServer.GET;
        const { username, password } = req.body;
        this.user.setUsername = username;
        this.user.setPassword = password;
        this.user.login(action).then((user$: any) => {
            if(!user$) {
                res.json({
                    action: 'login',
                    success: false,
                    message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                });
            } else {
                Enscrypts.compare(this.user.getPassword, user$.password).then((isMatch: boolean) => {
                    if(isMatch) {
                        delete user$.password;
                        const token = Enscrypts.hashingSync('vietnamfishery', Enscrypts.getSaltSync(Math.floor((Math.random() * 12) + 1))) + '100%<3' + jwt.sign(user$, secret);
                        res.json({
                            success: true,
                            token,
                            user: user$
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                        });
                    }
                }).catch(err => {
                    res.json({
                        success: false,
                        message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                    });
                });
            }
        }).catch(err => {
            res.json({
                success: false,
                message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
            });
        });
    }

    private getUserInfo = (request: Request, response: Response) => {
        const action = ActionServer.GET;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        this.user.setUsername = decodeToken.username;
        this.user.getUserInfo(action).then(user$ => {
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
        const action = ActionServer.UPDATE;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { firstname, lastname, birthday, email, phone, town, district, province, images } = request.body;
        this.user.setUser(null,firstname,lastname,decodetoken.username,null,birthday,email,phone,null,town,district,province,null,images,null,null,null,null,null);
        if(request.files) {
            GoogleDrive.upload(request,response,next).then((data: any) => {
                if(data.fileId) {
                    this.user.setImages = data.fileId;
                    this.user.updateMyProfile(action).then(res => {
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
            this.user.updateMyProfile(action).then(res => {
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
        const action = ActionServer.UPDATE;
        const { oldPassword, newPassword } = request.body;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        this.user.setUsername = decodeToken.username;
        this.user.getUserInfo(ActionServer.GET).then((data: any) => {
            Enscrypts.compare(oldPassword, data.password).then((isMatch: boolean) => {
                if(!isMatch) {
                    response.status(200).json({
                        success: false,
                        message: 'Sai mật khẩu cũ!'
                    });
                } else {
                    this.user.setPassword = newPassword;
                    this.user.updateMyProfile(action).then((data$: any) => {
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
}
