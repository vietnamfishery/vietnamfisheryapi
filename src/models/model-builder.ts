import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    usersAssociate(
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

    userRolesAssociate(
        userModel: any,
        pondUserRolesModel: any
    ) {
        associations.userrolesToUsers(this.model, userModel);
        associations.userrolesPondUserRoles(this.model, pondUserRolesModel);
    }

    boughtbreeddetailsAssociate(boughtBreedsModel: any, breedsModel: any) {
        associations.boughtbreeddetailsToBoughtBreeds(this.model, boughtBreedsModel);
        associations.boughtbreeddetailsToBreeds(this.model, breedsModel);
    }

    boughtbreedsAssociate(boughtBreedDetailsModel: any, usersModel: any) {
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
        associations.boughtbreedsToUsers(this.model, usersModel);
    }

    breedsAssociate(boughtBreedDetailsModel: any, stockingDetailsModel: any) {
        associations.breedsToStockingDetails(this.model, stockingDetailsModel);
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
    }

    costsAssociate(pondPrepareModel: any) {
        associations.costsToPondPrepare(this.model, pondPrepareModel);
    }

    couponAssociate(materialModel: any, usersModel: any) {
        associations.couponToMaterial(this.model, materialModel);
        associations.couponToUsers(this.model, usersModel);
    }

    diedfisherysAssociate(seasonModel: any) {
        associations.diedfisherysToSeasonAndPond(this.model, seasonModel);
    }

    growthsAssociate(seasonModel: any) {
        associations.growthsToSeasonAndPond(this.model, seasonModel);
    }

    harvestdetailsAssociate(harvestsModel: any) {
        associations.harvestdetailsToHarvests(this.model, harvestsModel);
    }

    harvestsAssociate(harvestDetailsModel: any, seasonModel: any) {
        associations.harvestsToHarvestDetails(this.model, harvestDetailsModel);
        associations.harvestsToSeasonAndPond(this.model, seasonModel);
    }

    materialAssociate(couponModel: any, storagesModel: any) {
        associations.materialToCoupon(this.model, couponModel);
        associations.materialToStorages(this.model, storagesModel);
    }

    ponddiaryAssociate(seasonModel: any) {
        associations.ponddiaryToSeasonAndPond(this.model, seasonModel);
    }

    pondenvironmentAssociate(seasonModel: any) {
        associations.pondenvironmentoToSeasonAndPond(this.model, seasonModel);
    }

    pondprepareAssociate(seasonModel: any, costsModel: any) {
        associations.pondprepareToCosts(this.model, costsModel);
        associations.pondprepareToSeasonAndPond(this.model, seasonModel);
    }

    pondpreparedetailsAssociate(pondPrepareModel: any, storagesModel: any) {
        associations.pondpreparedetailsToPondPrepare(this.model, pondPrepareModel);
        associations.pondpreparedetailsToStorages(this.model, storagesModel);
    }

    pondsAssociate(ponduserrolesModel: any, seasonModel: any, seasonandpondModel: any) {
        associations.pondsToponduserroles(this.model, ponduserrolesModel);
        associations.pondsToSeason(this.model, seasonModel);
        // associations.pondsToUsers(this.model, usersModel);
        associations.pondsToSeasonAndPond(this.model, seasonandpondModel);
    }

    pricesAssociate(storagesModel: any) {
        associations.pricesToStorages(this.model, storagesModel);
    }

    ponduserrolesAssociate(userRolesModel: any, pondsModel: any) {
        associations.ponduserrolesToUserRoles(this.model, userRolesModel);
        associations.ponduserrolesToPond(this.model, pondsModel);
    }

    usingveterinaryAssociate(storagesModel: any, takecareModel: any) {
        associations.usingveterinaryToStorages(this.model, storagesModel);
        associations.usingveterinaryToTakecare(this.model, takecareModel);
    }

    usingfoodsAssociate(storagesModel: any, takecareModel: any) {
        associations.usingfoodsToStorages(this.model, storagesModel);
        associations.usingfoodsToTakecare(this.model, takecareModel);
    }

    takecareAssociate(usingveterinaryModel: any, usingfoodsModel: any, seasonModel: any) {
        associations.takecareToUsingveterinary(this.model, usingveterinaryModel);
        associations.takecareToUsingfoods(this.model, usingfoodsModel);
        associations.takecareToSeason(this.model, seasonModel);
    }

    storagesAssociate(
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

    stockingdetailsAssociate(stockingModel: any, breedsModel: any) {
        associations.stockingdetailsToStocking(this.model, stockingModel);
        associations.stockingdetailsToBreeds(this.model, breedsModel);
    }

    stockingAssociate(stockingdetailsModel: any, seasonModel: any) {
        associations.stockingToStockingdetails(this.model, stockingdetailsModel);
        associations.stockingToSeason(this.model, seasonModel);
    }

    // seasonAssociate(
    //     pondsModel: any,
    //     ponddiaryModel: any,
    //     pondprepareModel: any,
    //     takecareModel: any,
    //     growthsModel: any,
    //     diedfisherysModel: any,
    //     pondenvironmentsModel: any,
    //     stockingModel: any,
    //     harvestModel: any,
    //     seasonAndPondModel: any
    // ) {
    //     associations.seasonToPonds(this.model, pondsModel);
    //     associations.seasonToPonddiary(this.model, ponddiaryModel);
    //     associations.seasonToPondprepare(this.model, pondprepareModel);
    //     associations.seasonToTakecare(this.model, takecareModel);
    //     associations.seasonToGrowths(this.model, growthsModel);
    //     associations.seasonToDiedfisherys(this.model, diedfisherysModel);
    //     associations.seasonToPondenvironments(this.model, pondenvironmentsModel);
    //     associations.seasonToStocking(this.model, stockingModel);
    //     associations.seasonToHarvest(this.model, harvestModel);
    //     associations.seasonToSeasonAndPond(this.model, seasonAndPondModel);
    // }

    seasonAndPondAssocite(
        seasonModel: any,
        pondsModel: any
    ) {
        associations.withSeason(this.model, seasonModel);
        associations.withPond(this.model, pondsModel);
    }

    provinceAssociate(userModel: any) {
        associations.provinceToUser(this.model, userModel);
    }

    districtAssociate(userModel: any) {
        associations.districtToUser(this.model, userModel);
    }

    wardAssociate(userModel: any) {
        associations.wardToUser(this.model, userModel);
    }
}
