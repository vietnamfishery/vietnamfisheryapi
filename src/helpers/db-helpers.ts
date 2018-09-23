import { Sequelize } from 'sequelize';
import * as Sequeliz from 'sequelize';
import * as config from '../config';
import * as constants from '../common';
import { logger } from '../services';
import { IModelsDB } from '../interfaces';

const { dialect, operatorsAliases, pool, replication } = config.configDB;

export default class DBHelper {
    public static sequelize: Sequelize;
    constructor() {
        DBHelper.sequelize = new Sequeliz(constants.databaseName, null, null, {
            dialect,
            operatorsAliases,
            pool,
            replication
        });
    }

    public static async getDatabaseConnection() {
        DBHelper.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    public toModel (models: IModelsDB): Sequeliz.Model<{}, any> {
        return DBHelper.sequelize.define(models.name, models.model, {
            createdAt: false,
            scopes: {
                deletedRecord: {
                    where: {
                        isDeleted: true
                    }
                }
            },
            defaultScope: {
                where: {
                    isDeleted: false
                }
            },
            deletedAt: false,
            hooks: {},
            updatedAt: false
        });
    }
}
