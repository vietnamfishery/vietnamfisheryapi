import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public usersAssociate(
        userrolesModel: any,
        pondsModel: any,
        couponModel: any,
        boughtbreedsModel: any,
        provinceModel: any,
        districtModel: any,
        wardModel: any,
    ) {
        associations.userToRolesUser(this.model, userrolesModel);
        associations.userToPond(this.model, pondsModel);
        associations.userToCoupon(this.model, couponModel);
        associations.userToBoughtBreeds(this.model, boughtbreedsModel);
        associations.userToProvince(this.model, provinceModel);
        associations.userToDistrict(this.model, districtModel);
        associations.userToWard(this.model, wardModel);
    }

    public userRolesAssociate(
        userModel: any,
        pondUserRolesModel: any
    ) {
        associations.userrolesToUsers(this.model, userModel);
        associations.userrolesPondUserRoles(this.model, pondUserRolesModel);
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

    public pondsAssociate(ponduserrolesModel: any, seasonModel: any, usersModel: any) {
        associations.pondsToponduserroles(this.model, ponduserrolesModel);
        associations.pondsToSeason(this.model, seasonModel);
        associations.pondsToUsers(this.model, usersModel);
    }

    public pricesAssociate(storagesModel: any) {
        associations.pricesToStorages(this.model, storagesModel);
    }

    public ponduserrolesAssociate(userRolesModel: any, pondsModel: any) {
        associations.ponduserrolesToUserRoles(this.model, userRolesModel);
        associations.ponduserrolesToPond(this.model, pondsModel);
    }

    public usingveterinaryAssociate(storagesModel: any, takecareModel: any) {
        associations.usingveterinaryToStorages(this.model, storagesModel);
        associations.usingveterinaryToTakecare(this.model, takecareModel);
    }

    public usingfoodsAssociate(storagesModel: any, takecareModel: any) {
        associations.usingfoodsToStorages(this.model, storagesModel);
        associations.usingfoodsToTakecare(this.model, takecareModel);
    }

    public takecareAssociate(usingveterinaryModel: any, usingfoodsModel: any, seasonModel: any) {
        associations.takecareToUsingveterinary(this.model, usingveterinaryModel);
        associations.takecareToUsingfoods(this.model, usingfoodsModel);
        associations.takecareToSeason(this.model, seasonModel);
    }

    public storagesAssociate(
        pondpreparedetailsModel: any,
        MaterialsModel: any,
        PricesModel: any,
        UsingfoodsModel: any,
        UsingveterinaryModel: any
    ) {
        associations.storagesToPondpreparedetails(this.model, pondpreparedetailsModel);
        associations.storagesToMaterial(this.model, MaterialsModel);
        associations.storagesToPrices(this.model, PricesModel);
        associations.storagesToUsingfoods(this.model, UsingfoodsModel);
        associations.storagesToUsingveterinary(this.model, UsingveterinaryModel);
    }

    public stockingdetailsAssociate(stockingModel: any, breedsModel: any) {
        associations.stockingdetailsToStocking(this.model, stockingModel);
        associations.stockingdetailsToBreeds(this.model, breedsModel);
    }

    public stockingAssociate(stockingdetailsModel: any, seasonModel: any) {
        associations.stockingToStockingdetails(this.model, stockingdetailsModel);
        associations.stockingToSeason(this.model, seasonModel);
    }

    public seasonAssociate(
        pondsModel: any,
        ponddiaryModel: any,
        pondprepareModel: any,
        takecareModel: any,
        growthsModel: any,
        diedfisherysModel: any,
        pondenvironmentsModel: any,
        stockingModel: any,
        harvestModel: any
    ) {
        associations.seasonToPonds(this.model, pondsModel);
        associations.seasonToPonddiary(this.model, ponddiaryModel);
        associations.seasonToPondprepare(this.model, pondprepareModel);
        associations.seasonToTakecare(this.model, takecareModel);
        associations.seasonToGrowths(this.model, growthsModel);
        associations.seasonToDiedfisherys(this.model, diedfisherysModel);
        associations.seasonToPondenvironments(this.model, pondenvironmentsModel);
        associations.seasonToStocking(this.model, stockingModel);
        associations.seasonToHarvest(this.model, harvestModel);
    }

    public provinceAssociate(userModel: any) {
        associations.provinceToUser(this.model, userModel);
    }

    public districtAssociate(userModel: any) {
        associations.districtToUser(this.model, userModel);
    }

    public wardAssociate(userModel: any) {
        associations.wardToUser(this.model, userModel);
    }
}
