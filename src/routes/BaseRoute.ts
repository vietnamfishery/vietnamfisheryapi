import { Router } from 'express';
import { Sequelize } from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { host, port, colorCli, method } from '../config';

export abstract class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    public static path = '/api';
    public static countEndpoints: number = 0;
    protected router: Router = Router();
    protected sequeliz: Sequelize = DBHelper.sequelize;

    constructor () {}

    protected logEndpoints(router?: Router, path?: string) {
        if(path) {
            for(const stack of router.stack) {
                const endpoints: string = Object.keys(stack.route.methods)[0].toLocaleUpperCase();
                console.log(`[${
                    endpoints === method.get ? colorCli.MAGENTA : endpoints === method.post ? colorCli.YELLOW : endpoints === method.put ? colorCli.CYAN : colorCli.RED
                }${ endpoints }${ colorCli.RESET }]\thttp://${ host }:${ port }${BaseRoute.path}${path}${ stack.route.path }`);
                BaseRoute.countEndpoints++;
            }
            console.log('');
        }
    }
}
