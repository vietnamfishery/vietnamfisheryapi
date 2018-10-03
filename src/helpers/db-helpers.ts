import { Sequelize } from 'sequelize';
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
    private usersModel$: Sequeliz.Model<{}, any>;
    private pondsModel$: Sequeliz.Model<{}, any>;
    private rolesUsersModel$: Sequeliz.Model<{}, any>;
    private couponModel$: Sequeliz.Model<{}, any>;
    private boughtbreedsModel$: Sequeliz.Model<{}, any>;
    constructor(private optionsModel: IOptionsModelDB) {
        this.usersModel$ = this.toModel(userOptions.tableName, userOptions.attributes, userOptions.options);
        this.pondsModel$ = this.toModel(pondOptions.tableName, pondOptions.attributes, pondOptions.options);
        this.rolesUsersModel$ = this.toModel(rolesusersOptions.tableName, rolesusersOptions.attributes, rolesusersOptions.options);
        this.couponModel$ = this.toModel(couponOptions.tableName, couponOptions.attributes, couponOptions.options);
        this.boughtbreedsModel$ = this.toModel(boughtbreedOptions.tableName, boughtbreedOptions.attributes, boughtbreedOptions.options);
        console.log(options);
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
        const modelBuilder: ModelBuilder = new ModelBuilder(this.model);
        modelBuilder.userAssociate(this.rolesUsersModel$, this.pondsModel$, this.couponModel$, this.boughtbreedsModel$);
        return this.model;
    }
}
