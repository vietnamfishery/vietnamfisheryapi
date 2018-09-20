import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User } from '../../components/users/users';
import * as uuidv4 from 'uuid/v4';

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
  private constructor () {
    super();
    this.get = this.get.bind(this);
    this.init();
  }

  static get router () {
    if (!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance.router;
  }

  private init () {
    // log
    logger.info('[UserRoute] Creating ping route.');

    // add index page route
    this.router.post('/signin', this.addNewUser);
  }

  /**
   * @class UserRoute
   * @method get
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private async get (req: Request, res: Response, next: NextFunction) {
    const request = req;
    res.json({pong: 'pong'});
  }

  private async addNewUser (req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, username, password, birdthday, email, phone, address, town, district, province, roles, status, images, cretatedDate, updateddDate, isDeleted } = req.body
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
    )
    const salt = await user.signin();
    res.json({salt});
  }
}
