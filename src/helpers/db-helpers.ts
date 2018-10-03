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

    public get boughtbreeddetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.boughtbreeddetailsAssociate(this.models[`boughtbreedOptions`], this.models[`breedOptions`]);
        return md;
    }

    public get boughtbreedsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.boughtbreedsAssociate(this.models[`boughtbreeddetailsOptions`], this.models[`userOptions`]);
        return md;
    }

    public get breedsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.breedsAssociate(this.models[`boughtbreeddetailsOptions`], this.models[`stockingdetailOptions`]);
        return md;
    }

    public get costsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.costsAssociate(this.models[`pondprepareOptions`]);
        return md;
    }

    public get couponModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.couponAssociate(this.models[`materialOptions`], this.models[`userOptions`]);
        return md;
    }

    public get diedfisherysModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.diedfisherysAssociate(this.models[`seasonOptions`]);
        return md;
    }

    public get growthsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.growthsAssociate(this.models[`seasonOptions`]);
        return md;
    }

    public get harvestdetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.harvestdetailsAssociate(this.models[`harvestOptions`]);
        return md;
    }

    public get harvestModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.harvestsAssociate(this.models[`harvestdetailOptions`], this.models[`seasonOptions`]);
        return md;
    }

    public get materialModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.materialAssociate(this.models[`couponOptions`], this.models[`storagesOptions`]);
        return md;
    }

    public get ponddiaryModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.materialAssociate(this.models[`couponOptions`], this.models[`storagesOptions`]);
        return md;
    }

    public get pondenvironmentsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondenvironmentAssociate(this.models[`seasonOptions`]);
        return md;
    }

    public get pondprepareModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondprepareAssociate(this.models[`seasonOptions`], this.models[`costsOptions`]);
        return md;
    }

    public get pondpreparedetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondpreparedetailsAssociate(this.models[`pondprepareOptions`], this.models[`storagesOptions`]);
        return md;
    }

    public get pondsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondsAssociate(this.models[`rolesusersOptions`], this.models[`seasonOptions`], this.models[`userOptions`]);
        return md;
    }

    public get pricesModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pricesAssociate(this.models[`storagesOptions`]);
        return md;
    }

    public get rolesusersModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.rolesusersAssociate(this.models[`pondOptions`], this.models[`userOptions`]);
        return md;
    }
}
