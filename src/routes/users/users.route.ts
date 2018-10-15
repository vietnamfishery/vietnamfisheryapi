import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/users/users';
import * as uuidv4 from 'uuid/v4';
// import { LoginHelper } from '../../helpers/login-helpers';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import * as constants from '../../common';

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
        // const loginHelper = new LoginHelper();
        // add index page route
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/login', this.loginSuccess);
        this.router.get('/login/failure', this.loginFailure);
        this.router.get('/info', this.getUserInfo);
        this.router.post('/updateUser', this.updateUserProfile);
        // this.router.get('/login-ui', function(req, res) {
        //     res.redirect((req.headers as any).origin);
        // });
    }

    private register = (req: Request, res: Response, next: NextFunction) => {
        const { firstname, lastname, username, password, birdthday, email, phone, address, town, district, province, roles, status, createdBy, createdDate, updatedBy, updatedDate, isDeleted, action } = req.body;
        const user: User = new User(
            uuidv4(),
            firstname,
            lastname,
            username.toLowerCase(),
            password,
            birdthday,
            email,
            phone,
            address,
            town,
            district,
            province,
            status,
            'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png',
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
            isDeleted
        );
        const entity: any = {
            action,
            roles
        };
        user.register(entity).then((value: any) => {
            if(value.errors) {
                res.status(200).json({
                    action,
                    success: false
                });
            } else {
                const obj: any = value;
                obj[`action`] = action;
                obj[`success`] = true;
                res.json(obj);
            }
        });
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        const { firstname, lastname, username, password, birdthday, email, phone, address, town, district, province, action, status, createdBy, createdDate, updatedBy, updatedDate, isDeleted } = req.body;
        const user: User = new User(
            '',
            firstname,
            lastname,
            username.toLowerCase(),
            password,
            birdthday,
            email,
            phone,
            address,
            town,
            district,
            province,
            status,
            '',
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
            isDeleted
        );
        user.login(action).then(user$ => {
            if(!user$) {
                res.json({
                    action: 'login',
                    success: false
                });
            } else {
                Enscrypts.compare(user.password, user$.password).then((isMatch: boolean) => {
                    if(isMatch) {
                        delete user$.password;
                        const token = jwt.sign(user$, constants.secret);
                        const obj: any = user$;
                        obj[`action`] = 'login';
                        obj[`success`] = true;
                        obj[`token`] = token;
                        res.json(obj);
                    } else {
                        res.json({
                            action: 'login',
                            success: false
                        });
                    }
                }).catch(err => {
                    res.json({
                        action: 'login',
                        success: false
                    });
                });
            }
        }).catch(err => {
            res.json({
                action: 'login',
                success: false
            });
        });
    }

    private loginSuccess = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            action: 'login',
            status: true
        });
    }

    private loginFailure = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            action: 'login',
            status: false
        });
    }

    private getUserInfo = (request: Request, response: Response) => {
        const token: string = request.headers.authorization.split('%')[1];
        const decodetoken: any = jwt.verify(token,constants.secret);
        const user = new User(
            null,
            null,
            null,
            (decodetoken as any).username,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
        user.getUserInfo().then(user$ => {
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

    private updateUserProfile = (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization.split('%')[1];
        const decodetoken = jwt.verify(token,constants.secret);
        const { firstname, lastname, birthday, email, phone, town, district, province, action } = request.body;

        const user = new User(
            null,
            firstname,
            lastname,
            (decodetoken as any).username,
            null,
            birthday,
            email,
            phone,
            null,
            town,
            district,
            province,
            0,
            'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png',
            null,
            null,
            null,
            new Date(),
            0
        );
        user.updateMyProfile().then(res => {
            response.status(200).json(res);
        }).catch(e => {
            response.status(200).json({
                action,
                success: false,
                error: e
            });
        });
    }
}
