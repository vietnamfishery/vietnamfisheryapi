import { Sequelize, Options } from 'sequelize';
import * as Sequeliz from 'sequelize';
import * as config from '../config';
import * as constants from '../common';
import { IOptionsModelDB } from '../interfaces';
import { ModelBuilder } from '../models/model-builder';
import { userOptions, pondOptions, rolesusersOptions, couponOptions, boughtbreedOptions } from '../models/objects';
import * as options from '../models/objects';

const { dialect, operatorsAliases, pool, replication } = config.configDB;

export default class DBHelper {
    public static sequelize: Sequelize = new Sequeliz(constants.databaseName, null, null, {
        dialect,
        operatorsAliases,
        pool,
        replication
    });
    private models: any = {};

    constructor(private optionsModel: IOptionsModelDB) {
        Object.keys(options).forEach(element => {
            this.models[element] = this.toModel(options[element].tableName, options[element].attributes, options[element].options);
        });
    }

    public static getDatabaseConnection() {
        DBHelper.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    private toModel (modelName: string, model: any, deleteMode: any) {
        return DBHelper.sequelize.define(modelName, model, deleteMode);
    }

    private get modelName () {
        return this.optionsModel.name;
    }

    private get deleteMode () {
        return this.optionsModel.deleteMode;
    }

    private get model () {
        return DBHelper.sequelize.define(this.modelName, this.optionsModel.model, this.deleteMode);
    }

    public get usersModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.usersAssociate(this.models[`rolesusersOptions`], this.models[`pondOptions`], this.models[`couponOptions`], this.models[`boughtbreedOptions`]);
        return md;
    }
}
