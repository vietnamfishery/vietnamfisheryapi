import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public usersAssociate(rolesUsersModel: any, pondsModel: any, couponModel: any, boughtbreedsModel: any) {
        associations.userToRolesUser(this.model, rolesUsersModel);
        associations.userToPond(this.model, pondsModel);
        associations.userToCoupon(this.model, couponModel);
        associations.userToBoughtBreeds(this.model, boughtbreedsModel);
    }

    public boughtbreeddetailsAssociate(boughtBreedsModel: any, breedsModel: any) {
        associations.boughtbreeddetailsToBoughtBreeds(this.model, boughtBreedsModel);
        associations.boughtbreeddetailsToBreeds(this.model, breedsModel);
    }

    public boughtbreedsAssociate(boughtBreedDetailsModel: any, usersModel: any) {
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
        associations.boughtbreedsToUsers(this.model, usersModel);
    }

    public breedsAssociate(boughtBreedDetailsModel: any, stockingDetailsModel: any) {
        associations.breedsToStockingDetails(this.model, stockingDetailsModel);
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
    }

    public costsAssociate(pondPrepareModel: any) {
        associations.costsToPondPrepare(this.model, pondPrepareModel);
    }

    public couponAssociate(materialModel: any, usersModel: any) {
        associations.couponToMaterial(this.model, materialModel);
        associations.couponToUsers(this.model, usersModel);
    }

    public diedfisherysAssociate(seasonModel: any) {
        associations.diedfisherysToSeason(this.model, seasonModel);
    }

    public growthsAssociate(seasonModel: any) {
        associations.growthsToSeason(this.model, seasonModel);
    }

    public harvestdetailsAssociate(harvestsModel: any) {
        associations.harvestdetailsToHarvests(this.model, harvestsModel);
    }

    public harvestsAssociate(harvestDetailsModel: any, seasonModel: any) {
        associations.harvestsToHarvestDetails(this.model, harvestDetailsModel);
        associations.harvestsToSeason(this.model, seasonModel);
    }

    public materialAssociate(couponModel: any, storagesModel: any) {
        associations.materialToCoupon(this.model, couponModel);
        associations.materialToStorages(this.model, storagesModel);
    }

    public ponddiaryAssociate(seasonModel: any) {
        associations.ponddiaryToSeason(this.model, seasonModel);
    }

    public pondenvironmentAssociate(seasonModel: any) {
        associations.pondenvironmentsToSeason(this.model, seasonModel);
    }

    public pondprepareAssociate(seasonModel: any, costsModel: any) {
        associations.pondprepareToCosts(this.model, costsModel);
        associations.pondprepareToSeason(this.model, seasonModel);
    }

    public pondpreparedetailsAssociate(pondPrepareModel: any, storagesModel: any) {
        associations.pondpreparedetailsToPondPrepare(this.model, pondPrepareModel);
        associations.pondpreparedetailsToStorages(this.model, storagesModel);
    }

    public pondsAssociate(rolesusersModel: any, seasonModel: any, usersModel: any) {
        associations.pondsToRolesusers(this.model, rolesusersModel);
        associations.pondsToSeason(this.model, seasonModel);
        associations.pondsToUsers(this.model, usersModel);
    }

    public pricesAssociate(storagesModel: any) {
        associations.pricesToStorages(this.model, storagesModel);
    }

    public rolesusersAssociate(pondsModel: any, usersModel: any) {
        associations.rolesusersToPonds(this.model, pondsModel);
        associations.rolesusersToUsers(this.model, usersModel);
    }
}
