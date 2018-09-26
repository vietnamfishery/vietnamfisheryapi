import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/users/users';
import * as uuidv4 from 'uuid/v4';
import { LoginHelper } from '../../helpers/login-helpers';

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
        const loginHelper = new LoginHelper();
        // add index page route
        this.router.post('/signin', this.signin);
        this.router.post('/login', loginHelper.authenticate('login/success', 'login'));
        this.router.get('/login/success', LoginHelper.isLoggedIn, this.loginSuccess);
        this.router.get('/login', LoginHelper.notLoggedIn, this.loginFailure);
        this.router.get('/login-ui', function(req, res) {
            res.render('login');
        });
    }

    private signin = async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, username, password, birdthday, email, phone, address, town, district, province, roles, status, createdBy, createdDate, updatedBy, updatedDate, isDeleted } = req.body;
        const user: User = new User(
            uuidv4(),
            firstName,
            lastName,
            username,
            password,
            birdthday,
            email,
            phone,
            address,
            town,
            district,
            province,
            roles,
            status,
            'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png',
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
            isDeleted
        );
        res.json(await user.signin());
    }

    private loginSuccess = async (req: Request, res: Response, next: NextFunction) => {
        res.json({
            action: 'login',
            status: true
        });
    }

    private loginFailure = async (req: Request, res: Response, next: NextFunction) => {
        res.json({
            action: 'login',
            status: false
        });
    }
}
