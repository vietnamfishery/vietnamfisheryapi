import { Sequelize } from 'sequelize';
import * as Sequeliz from 'sequelize';
import * as config from '../config';
import * as constants from '../common';
import { IOptionsModelDB } from '../interfaces';
import { ModelBuilder } from '../models/model-builder';
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
        return this.optionsModel.tableName;
    }

    private get deleteMode () {
        return this.optionsModel.options;
    }

    private get model () {
        return DBHelper.sequelize.define(this.modelName, this.optionsModel.attributes, this.deleteMode);
    }

    public get usersModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.usersAssociate(
            this.models[`districtOptions`],
            this.models[`userrolesOptions`],
            this.models[`pondOptions`],
            this.models[`couponOptions`],
            this.models[`boughtbreedOptions`],
            this.models[`provinceOptions`],
            this.models[`seasonOptions`],
            this.models[`wardOptions`],
            this.models[`storageOwnerOptions`],
            this.models[`ownerBreedOptions`]
        );
        return md;
    }

    public get boughtbreedsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.boughtbreedsAssociate(
            this.models[`boughtbreeddetailsOptions`],
            this.models[`breedOptions`],
            this.models[`seasonOptions`]
        );
        return md;
    }

    public get boughtbreeddetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.boughtbreeddetailsAssociate(
            this.models[`boughtbreedOptions`],
            this.models[`breedOptions`]
        );
        return md;
    }

    public get breedOwnerModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.breedOwnerAssociate(
            this.models[`breedOptions`],
            this.models[`userOptions`]
        );
        return md;
    }

    public get provinceModel() {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.provinceAssociate(this.models[`userOptions`]);
        return md;
    }

    public get districtModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.districtAssociate(this.models[`userOptions`]);
        return md;
    }

    public get wardModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.wardAssociate(this.models[`userOptions`]);
        return md;
    }

    public get breedsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.breedsAssociate(
            this.models[`boughtbreeddetailsOptions`],
            this.models[`stockingdetailOptions`],
            this.models[`ownerBreedOptions`]
        );
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
        modelBuilder.couponAssociate(
            this.models[`materialOptions`],
            this.models[`userOptions`]
        );
        return md;
    }

    public get diedfisherysModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.diedfisherysAssociate(this.models[`seasonAndPondOptions`]);
        return md;
    }

    public get growthsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.growthsAssociate(this.models[`seasonAndPondOptions`]);
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
        modelBuilder.harvestsAssociate(this.models[`harvestdetailOptions`], this.models[`seasonAndPondOptions`]);
        return md;
    }

    public get materialModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.materialAssociate(
            this.models[`couponOptions`],
            this.models[`pondprepareOptions`],
            this.models[`storagesOptions`],
            this.models[`usingfoodOptions`],
            this.models[`usingveterinaryOptions`]
        );
        return md;
    }

    public get ponddiaryModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.ponddiaryAssociate(
            this.models[`seasonOptions`]
        );
        return md;
    }

    public get pondenvironmentsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondenvironmentAssociate(this.models[`seasonAndPondOptions`]);
        return md;
    }

    public get pondprepareModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondprepareAssociate(
            this.models[`seasonAndPondOptions`],
            this.models[`costsOptions`],
            this.models[`pondpreparedetailOptions`]
        );
        return md;
    }

    public get pondpreparedetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondpreparedetailsAssociate(this.models[`pondprepareOptions`], this.models[`materialOptions`]);
        return md;
    }

    public get pondsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pondsAssociate(
            this.models[`ponduserrolesOptions`],
            this.models[`seasonAndPondOptions`],
            this.models[`userOptions`]
        );
        return md;
    }

    public get pricesModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.pricesAssociate(this.models[`seasonOptions`]);
        return md;
    }

    public get ponduserrolesModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.ponduserrolesAssociate(
            this.models[`userOptions`],
            this.models[`pondOptions`]
        );
        return md;
    }

    public get userRolesModel() {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.userRolesAssociate(
            this.models[`ponduserrolesOptions`],
            this.models[`userOptions`]
        );
        return md;
    }

    public get usingveterinaryModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.usingveterinaryAssociate(
            this.models[`materialOptions`],
            this.models[`takecareOptions`]
        );
        return md;
    }

    public get usingfoodsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.usingfoodsAssociate(
            this.models[`materialOptions`],
            this.models[`takecareOptions`]
        );
        return md;
    }

    public get takecareModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.takecareAssociate(
            this.models[`usingveterinaryOptions`],
            this.models[`usingfoodOptions`],
            this.models[`seasonAndPondOptions`]
        );
        return md;
    }

    public get storagesModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.storagesAssociate(
            this.models[`materialOptions`],
            this.models[`storageOwnerOptions`]
        );
        return md;
    }

    public get ownerStoragesModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.storageOwnerAssociate(
            this.models[`storagesOptions`],
            this.models[`userOptions`]
        );
        return md;
    }

    public get stockingdetailsModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.stockingdetailsAssociate(
            this.models[`stockingOptions`],
            this.models[`breedOptions`]
        );
        return md;
    }

    public get stockingModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.stockingAssociate(
            this.models[`stockingdetailOptions`],
            this.models[`seasonAndPondOptions`]
        );
        return md;
    }

    public get seasonModel () {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.seasonAssociate(
            this.models[`boughtbreedOptions`],
            this.models[`couponOptions`],
            this.models[`pricesOptions`],
            this.models[`userOptions`],
            this.models[`seasonAndPondOptions`],
            this.models[`storagesOptions`],
        );
        return md;
    }

    public get seasonAndPondModel() {
        const md = this.model;
        const modelBuilder: ModelBuilder = new ModelBuilder(md);
        modelBuilder.seasonAndPondAssociate(
            this.models[`diedfisherysOptions`],
            this.models[`growthOptions`],
            this.models[`harvestOptions`],
            this.models[`ponddiaryOptions`],
            this.models[`pondenvironmentsOptions`],
            this.models[`pondprepareOptions`],
            this.models[`pondOptions`],
            this.models[`seasonOptions`],
            this.models[`stockingOptions`],
            this.models[`takecareOptions`]
        );
        return md;
    }
}
