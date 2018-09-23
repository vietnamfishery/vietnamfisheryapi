import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/users/users';
import * as uuidv4 from 'uuid/v4';
import { IModelsDB } from '../../interfaces';
import { userModel } from '../../models';

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
    private constructor(
        models: IModelsDB = {
            name: 'user',
            model: userModel
        }
    ) {
        super(models);
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
        this.router.post('/signin', this.addNewUser);
    }

    private addNewUser = async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, username, password, birdthday, email, phone, address, town, district, province, roles, status, cretatedDate, updateddDate, isDeleted } = req.body;
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
            cretatedDate,
            updateddDate,
            isDeleted
        );
        res.json(await user.signin(this.model));
    }
}
