import { Router } from 'express';
import { logger } from '../services';
import DBHelper from '../helpers/db-helpers';
import { IModelsDB } from '../interfaces';
import * as Sequeliz from 'sequelize';

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
    public conn: DBHelper = new DBHelper();
    protected models: Sequeliz.Model<{}, any>;

    constructor (models: IModelsDB) {
        this.models = this.conn.toModel(models);
    }

    public get model(): Sequeliz.Model<{}, any> {
        return this.models;
    }
}
