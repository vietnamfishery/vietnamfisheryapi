import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) { }

    boughtbreeddetailsAssociate(boughtBreedsModel: any, breedsModel: any) {
        associations.boughtbreeddetailsToBoughtBreeds(this.model, boughtBreedsModel);
        associations.boughtbreeddetailsToBreeds(this.model, breedsModel);
    }

    boughtbreedsAssociate(
        boughtBreedDetailsModel: any,
        breedModel: any,
        seasonModel: any
    ) {
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
        associations.boughtbreedsToBreeds(this.model, breedModel);
        associations.boughtbreedsToSeason(this.model, seasonModel);
    }

    breedsAssociate(
        boughtBreedDetailsModel: any,
        stockingDetailsModel: any
    ) {
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
        associations.breedsToStockingDetails(this.model, stockingDetailsModel);
    }

    costsAssociate(pondPrepareModel: any) {
        associations.costsToPondPrepare(this.model, pondPrepareModel);
    }

    couponAssociate(
        seasonModel: any,
        materialModel: any,
        usersModel: any
    ) {
        associations.couponToSeason(this.model, seasonModel);
        associations.couponToMaterial(this.model, materialModel);
        associations.couponToUsers(this.model, usersModel);
    }

    diedfisherysAssociate(seasonAndPondModel: any) {
        associations.diedfisherysToSeasonAndPond(this.model, seasonAndPondModel);
    }

    districtAssociate(userModel: any) {
        associations.districtToUser(this.model, userModel);
    }

    growthsAssociate(seasonAndPondModel: any) {
        associations.growthsToSeasonAndPond(this.model, seasonAndPondModel);
    }

    harvestdetailsAssociate(harvestsModel: any) {
        associations.harvestdetailsToHarvests(this.model, harvestsModel);
    }

    harvestsAssociate(harvestDetailModel: any, seasonAndPondModel: any) {
        associations.harvestsToHarvestDetails(this.model, harvestDetailModel);
        associations.harvestsToSeasonAndPond(this.model, seasonAndPondModel);
    }

    materialAssociate(
        couponModel: any,
        pondPrepareModel: any,
        storageModel: any,
        usingFoodModel: any,
        usingVeterinayModel: any
    ) {
        associations.materialToCoupon(this.model, couponModel);
        associations.materialToPondPrepare(this.model, pondPrepareModel);
        associations.materialToStorages(this.model, storageModel);
        associations.materialToUsingFood(this.model, usingFoodModel);
        associations.materialToUsingVeterinary(this.model, usingVeterinayModel);
    }

    ponddiaryAssociate(seasonAndPondModel: any) {
        associations.ponddiaryToSeasonAndPond(this.model, seasonAndPondModel);
    }

    pondenvironmentAssociate(seasonAndModel: any) {
        associations.pondenvironmenToSeasonAndPond(this.model, seasonAndModel);
    }

    pondprepareAssociate(seasonAndPondModel: any, costsModel: any, pondPrepareDetailModel: any) {
        associations.pondprepareToCosts(this.model, costsModel);
        associations.pondprepareToPondPrepareDetails(this.model, pondPrepareDetailModel);
        associations.pondprepareToSeasonAndPond(this.model, seasonAndPondModel);
    }

    pondpreparedetailsAssociate(pondPrepareModel: any, materialModel: any) {
        associations.pondpreparedetailsToMaterial(this.model, materialModel);
        associations.pondpreparedetailsToPondPrepare(this.model, pondPrepareModel);
    }

    pondsAssociate(pondUserRolesModel: any, seasonAndPondModel: any, userModel: any,) {
        associations.pondsToPondUserRoles(this.model, pondUserRolesModel);
        associations.pondsToSeasonAndPond(this.model, seasonAndPondModel);
        associations.pondsToUser(this.model, userModel);
    }

    ponduserrolesAssociate(
        userModel: any,
        pondsModel: any
    ) {
        associations.ponduserrolesToUser(this.model, userModel);
        associations.ponduserrolesToPond(this.model, pondsModel);
    }

    pricesAssociate(seasonModel: any) {
        associations.pricesToSeason(this.model, seasonModel);
    }

    provinceAssociate(userModel: any) {
        associations.provinceToUser(this.model, userModel);
    }

    seasonAssociate(
        boughtBreedModel: any,
        couponModel: any,
        priceModel: any,
        userModel: any,
        seasonAndPondModel: any,
        storageModel: any
    ) {
        associations.seasonToBoughtBreed(this.model, boughtBreedModel);
        associations.seasonToCoupon(this.model, couponModel);
        associations.seasonToPrice(this.model, priceModel);
        associations.seasonToUser(this.model, userModel);
        associations.seasonToSNP(this.model, seasonAndPondModel);
        associations.seasonToStorage(this.model, storageModel);
    }

    seasonAndPondAssociate(
        diedFishModel: any,
        growthModel: any,
        harvestModel: any,
        pondDiary: any,
        pondEnvironmentModel: any,
        pondPrepareModel: any,
        pondsModel: any,
        seasonModel: any,
        stockingModel: any,
        takeCareModel: any
    ) {
        associations.withDiedFish(this.model, diedFishModel);
        associations.withGrowths(this.model, growthModel);
        associations.withHarvest(this.model, harvestModel);
        associations.withPondDiary(this.model, pondDiary);
        associations.withPondEnv(this.model, pondEnvironmentModel);
        associations.withPondPrepare(this.model, pondPrepareModel);
        associations.withPond(this.model, pondsModel);
        associations.withSeason(this.model, seasonModel);
        associations.withStocking(this.model, stockingModel);
        associations.withTakeCare(this.model, takeCareModel);
    }

    stockingAssociate(stockingdetailsModel: any, seasonAndPondModel: any) {
        associations.stockingToSNP(this.model, seasonAndPondModel);
        associations.stockingToStockingdetails(this.model, stockingdetailsModel);
    }

    stockingdetailsAssociate(stockingModel: any, breedsModel: any) {
        associations.stockingdetailsToBreeds(this.model, breedsModel);
        associations.stockingdetailsToStocking(this.model, stockingModel);
    }

    storagesAssociate(
        materialsModel: any,
        seasonModel: any
    ) {
        associations.storagesToMaterial(this.model, materialsModel);
        associations.storagesToSeason(this.model, seasonModel);
    }

    takecareAssociate(usingveterinaryModel: any, usingfoodsModel: any, seasonAndPondModel: any) {
        associations.takecareToSNP(this.model, seasonAndPondModel);
        associations.takecareToUsingfoods(this.model, usingfoodsModel);
        associations.takecareToUsingveterinary(this.model, usingveterinaryModel);
    }

    userRolesAssociate(
        pondUserRolesModel: any,
        userModel: any
    ) {
        associations.userrolesPondUserRoles(this.model, pondUserRolesModel);
        associations.userrolesToUsers(this.model, userModel);
    }

    usersAssociate(
        districtModel: any,
        rolesUserModel: any,
        pondsModel: any,
        couponModel: any,
        boughtbreedsModel: any,
        provinceModel: any,
        seasonModel: any,
        wardModel: any,
    ) {
        associations.userToDistrict(this.model, districtModel);
        associations.userToRolesUser(this.model, rolesUserModel);
        associations.userToPond(this.model, pondsModel);
        associations.userToCoupon(this.model, couponModel);
        associations.userToBoughtBreeds(this.model, boughtbreedsModel);
        associations.userToProvince(this.model, provinceModel);
        associations.userToSeason(this.model, seasonModel);
        associations.userToWard(this.model, wardModel);
    }

    usingfoodsAssociate(materialModel: any, takecareModel: any) {
        associations.usingfoodsToMaterial(this.model, materialModel);
        associations.usingfoodsToTakecare(this.model, takecareModel);
    }

    usingveterinaryAssociate(materialModel: any, takecareModel: any) {
        associations.usingveterinaryToMaterial(this.model, materialModel);
        associations.usingveterinaryToTakecare(this.model, takecareModel);
    }

    wardAssociate(userModel: any) {
        associations.wardToUser(this.model, userModel);
    }
}
