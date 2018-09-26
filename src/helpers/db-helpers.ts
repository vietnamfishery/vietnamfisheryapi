import { Sequelize } from 'sequelize';
import * as Sequeliz from 'sequelize';
import * as config from '../config';
import * as constants from '../common';
import { logger } from '../services';
import { IOptionsModelDB } from '../interfaces';

const { dialect, operatorsAliases, pool, replication } = config.configDB;

export default class DBHelper {
    public static sequelize: Sequelize = new Sequeliz(constants.databaseName, null, null, {
        dialect,
        operatorsAliases,
        pool,
        replication
    });
    constructor(private optionsModel: IOptionsModelDB) {}

    public static async getDatabaseConnection() {
        DBHelper.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    private get modelName () {
        return this.optionsModel.name;
    }

    private get deleteMode () {
        return this.optionsModel.deleteMode;
    }

    public get model () {
        return DBHelper.sequelize.define(this.modelName, this.optionsModel.model, this.deleteMode);
    }

}
