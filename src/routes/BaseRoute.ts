import { Router } from 'express';
import { logger } from '../services';
// import Sequelize from '../helpers/db-helper';

// const sqlConfig = (name: string): any => config.db[name];

export abstract class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    public static path = '/api';
    protected router = Router();
    protected connection: any = {};
}
