import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    usersAssociate(
        userrolesModel: any,
        pondsModel: any,
        couponModel: any,
        seasonModel: any,
        boughtbreedsModel: any,
        storageModel: any,
        provinceModel: any,
        districtModel: any,
        wardModel: any,
    ) {
        associations.userToRolesUser(this.model, userrolesModel);
        associations.userToPond(this.model, pondsModel);
        associations.userToSeason(this.model, seasonModel);
        associations.userToCoupon(this.model, couponModel);
        associations.userToBoughtBreeds(this.model, boughtbreedsModel);
        associations.userToProvince(this.model, provinceModel);
        associations.userToDistrict(this.model, districtModel);
        associations.userToWard(this.model, wardModel);
        associations.userToStorage(this.model, storageModel);
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

    diedfisherysAssociate(seasonAndModel: any) {
        associations.diedfisherysToSeasonAndPond(this.model, seasonAndModel);
    }

    growthsAssociate(seasonAndModel: any) {
        associations.growthsToSeasonAndPond(this.model, seasonAndModel);
    }

    harvestdetailsAssociate(harvestsModel: any) {
        associations.harvestdetailsToHarvests(this.model, harvestsModel);
    }

    harvestsAssociate(harvestDetailsModel: any, seasonAndModel: any) {
        associations.harvestsToHarvestDetails(this.model, harvestDetailsModel);
        associations.harvestsToSeasonAndPond(this.model, seasonAndModel);
    }

    materialAssociate(couponModel: any, storagesModel: any) {
        associations.materialToCoupon(this.model, couponModel);
        associations.materialToStorages(this.model, storagesModel);
    }

    ponddiaryAssociate(seasonAndModel: any) {
        associations.ponddiaryToSeasonAndPond(this.model, seasonAndModel);
    }

    pondenvironmentAssociate(seasonAndModel: any) {
        associations.pondenvironmentoToSeasonAndPond(this.model, seasonAndModel);
    }

    pondprepareAssociate(seasonAndModel: any, costsModel: any, pondPrepareDetailModel: any) {
        associations.pondprepareToCosts(this.model, costsModel);
        associations.pondprepareToPondPrepareDetails(this.model, pondPrepareDetailModel);
        associations.pondprepareToSeasonAndPond(this.model, seasonAndModel);
    }

    pondpreparedetailsAssociate(pondPrepareModel: any, storagesModel: any) {
        associations.pondpreparedetailsToPondPrepare(this.model, pondPrepareModel);
        associations.pondpreparedetailsToStorages(this.model, storagesModel);
    }

    pondsAssociate(ponduserrolesModel: any, seasonandpondModel: any) {
        associations.pondsToponduserroles(this.model, ponduserrolesModel);
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

    takecareAssociate(usingveterinaryModel: any, usingfoodsModel: any, seasonAndPondModel: any) {
        associations.takecareToUsingveterinary(this.model, usingveterinaryModel);
        associations.takecareToUsingfoods(this.model, usingfoodsModel);
        associations.takecareToSNP(this.model, seasonAndPondModel);
    }

    storagesAssociate(
        pondpreparedetailsModel: any,
        MaterialsModel: any,
        PricesModel: any,
        UsingfoodsModel: any,
        UsingveterinaryModel: any,
        userModel: any
    ) {
        associations.storagesToPondpreparedetails(this.model, pondpreparedetailsModel);
        associations.storagesToMaterial(this.model, MaterialsModel);
        associations.storagesToPrices(this.model, PricesModel);
        associations.storagesToUsingfoods(this.model, UsingfoodsModel);
        associations.storagesToUsingveterinary(this.model, UsingveterinaryModel);
        associations.storagesToUser(this.model, userModel);
    }

    stockingdetailsAssociate(stockingModel: any, breedsModel: any) {
        associations.stockingdetailsToStocking(this.model, stockingModel);
        associations.stockingdetailsToBreeds(this.model, breedsModel);
    }

    stockingAssociate(stockingdetailsModel: any, seasonAndPondModel: any) {
        associations.stockingToStockingdetails(this.model, stockingdetailsModel);
        associations.stockingToSNP(this.model, seasonAndPondModel);
    }

    seasonAssociate(
        userModel: any,
        seasonAndPondModel: any
    ) {
        associations.seasonToSNP(this.model, seasonAndPondModel);
        associations.seasonToUser(this.model, userModel);
    }

    seasonAndPondAssociate(
        seasonAndPondModel: any,
        pondsModel: any,
        diedFishModel: any,
        growthModel: any,
        harvestModel: any,
        pondDiary: any,
        pondPrepareModel: any,
        pondEnvironmentModel: any,
        takeCareModel: any,
        stockingModel: any
    ) {
        associations.withSeason(this.model, seasonAndPondModel);
        associations.withPond(this.model, pondsModel);
        associations.withDiedFish(this.model, diedFishModel);
        associations.withGrowths(this.model, growthModel);
        associations.withHarvest(this.model, harvestModel);
        associations.withPondDiary(this.model, pondDiary);
        associations.withPondPrepare(this.model, pondPrepareModel);
        associations.withPondEnv(this.model, pondEnvironmentModel);
        associations.withTakeCare(this.model, takeCareModel);
        associations.withStocking(this.model, stockingModel);
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
