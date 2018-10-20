import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/Users';
import * as uuidv4 from 'uuid/v4';
// import { LoginHelper } from '../../helpers/login-helpers';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import * as constants from '../../common';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { ActionServer, defaultImage } from '../../common';

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
        this.router.get('/get', this.getUserInfo);
        // this.router.post('/update', this.updateUserProfile);
        // this.router.post('/update/password', this.updateUserPassword);
        // this.router.get('/login-ui', function(req, res) {
        //     res.redirect((req.headers as any).origin);
        // });
    }

    private signup = (req: Request, res: Response, next: NextFunction) => {
        const action = ActionServer.INSERT;
        const { firstname, lastname, username, password } = req.body;
        const user: User = new User();
        user.setFirstname = firstname;
        user.setLastname = lastname;
        user.setUsername = username;
        user.setPassword = password;
        user.register(action).then((value: any) => {
            if(value.errors) {
                res.status(200).json({
                    action,
                    success: false
                });
            } else {
                const obj: any = value;
                obj[`action`] = action;
                obj[`success`] = true;
                res.json({
                    success: true,
                    message: 'Đăng ký thành công!'
                });
            }
        });
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        const action = ActionServer.SIGNIN;
        const { username, password } = req.body;
        const user: User = new User();
        user.setUsername = username;
        user.setPassword = password;
        user.login(action).then((user$: any) => {
            if(!user$) {
                res.json({
                    action: 'login',
                    success: false,
                    message: 'Sai tài khoản, mật khẩu, vui long thử lại!'
                });
            } else {
                Enscrypts.compare(user.getPassword, user$.password).then((isMatch: boolean) => {
                    if(isMatch) {
                        delete user$.password;
                        const token = jwt.sign(user$, constants.secret);
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
        const token: string = request.headers.authorization.split('%')[1];
        const decodetoken: any = jwt.verify(token,constants.secret);
        const user: User = new User();
        user.setUsername = decodetoken.username;
        const action = ActionServer.GET;
        user.getUserInfo(action).then(user$ => {
            if(!user$) {
                response.json({
                    action: 'login',
                    success: false
                });
            } else {
                delete user$[`password`];
                response.json(user$);
            }
        }).catch(err => {
            response.json({
                action: 'login',
                success: false
            });
        });
    }

    // private updateUserProfile = (request: Request, response: Response, next: NextFunction) => {
    //     const token: string = request.headers.authorization.split('%')[1];
    //     const decodetoken = jwt.verify(token,constants.secret);
    //     const { firstname, lastname, birthday, email, phone, town, district, province, images } = request.body;
    //     const action = request.files ? actionUserServices.UPLOAD_IMAGE : null;
    //     if(action === actionUserServices.UPLOAD_IMAGE) {
    //         GoogleDrive.upload(request,response,next).then((data: any) => {
    //             if(data.fileId) {
    //                 const user = new User();
    //                 user.updateMyProfile().then(res => {
    //                     if(Array.isArray(res)) {
    //                         response.status(200).json({
    //                             action,
    //                             success: true,
    //                             fileId: data.fileId
    //                         });
    //                     } else {
    //                         response.status(200).json({
    //                             action,
    //                             success: false
    //                         });
    //                     }
    //                 }).catch(e => {
    //                     response.status(200).json({
    //                         action,
    //                         success: false,
    //                         error: e
    //                     });
    //                 });
    //             } else {
    //                 response.status(200).json({
    //                     action,
    //                     success: false
    //                 });
    //             }
    //         });
    //     } else {
    //         const user = new User();
    //         user.updateMyProfile().then(res => {
    //             if(Array.isArray(res)) {
    //                 response.status(200).json({
    //                     action,
    //                     success: true
    //                 });
    //             } else {
    //                 response.status(200).json({
    //                     action,
    //                     success: false
    //                 });
    //             }
    //         }).catch(e => {
    //             response.status(200).json({
    //                 action,
    //                 success: false,
    //                 error: e
    //             });
    //         });
    //     }
    // }

    // private updateUserPassword = (request: Request, response: Response, next: NextFunction) => {
    //     const { oldPassword, newPassword } = request.body;
    //     const action = actionUserServices.CHANGEUSERPASSWORD;
    //     const token: string = request.headers.authorization.split('%')[1];
    //     const decodetoken: any = jwt.verify(token,constants.secret);
    //     const user = new User();
    //     user.getUserInfo().then((data: any) => {
    //         Enscrypts.compare(oldPassword, data.password).then((isMatch: boolean) => {
    //             if(!isMatch) {
    //                 response.status(200).json({
    //                     action,
    //                     success: false,
    //                     message: 'Sai mật khẩu cũ!'
    //                 });
    //             } else {
    //                 user.changePassword().then((data$: any) => {
    //                     response.status(200).json({
    //                         action,
    //                         success: true
    //                     });
    //                 }).catch(e => {
    //                     response.status(200).json({
    //                         action,
    //                         success: false,
    //                         error: e
    //                     });
    //                 });
    //             }
    //         });
    //     });
    // }
}
