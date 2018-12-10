import { Router } from 'express';
import { Sequelize } from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { host, port, colorCli, method, APIVersion } from '../config';
import * as validator from 'is-my-json-valid';

export abstract class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    public static path = '/api/v1';
    protected router = Router();
    protected connection: any = {};
    public static countEndpoints: number = 0;
    protected sequeliz: Sequelize = DBHelper.sequelize;
    protected validator: any = validator;

    protected logEndpoints(router?: Router, path?: string) {
        if(path) {
            for(const stack of router.stack) {
                const endpoints: string = Object.keys(stack.route.methods)[0].toLocaleUpperCase();
                console.log(`[${
                    endpoints === method.get ? colorCli.MAGENTA : endpoints === method.post ? colorCli.YELLOW : endpoints === method.put ? colorCli.CYAN : colorCli.RED
                }${ endpoints }${ colorCli.RESET }]\thttps://${ host }:${ port }${ BaseRoute.path }${ path }${ stack.route.path }`);
                BaseRoute.countEndpoints++;
            }
            console.log('');
        }
    }
}
