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
        seasonModel: any,
        usersModel: any
    ) {
        associations.boughtbreedsToBoughtBreedDetails(this.model, boughtBreedDetailsModel);
        associations.boughtbreedsToSeason(this.model, seasonModel);
        associations.boughtbreedsToUser(this.model, usersModel);
    }

    breedsAssociate(
        boughtBreedDetailsModel: any,
        stockingDetailsModel: any,
        breedOwnerModel: any
    ) {
        associations.breedToBoughBreedDetails(this.model, boughtBreedDetailsModel);
        associations.breedsToStockingDetails(this.model, stockingDetailsModel);
        associations.breedsToOwnerBreed(this.model, breedOwnerModel);
    }

    costsAssociate(pondPrepareModel: any) {
        associations.costsToPondPrepare(this.model, pondPrepareModel);
    }

    couponAssociate(
        materialModel: any,
        usersModel: any
    ) {
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

    pondpreparedetailsAssociate(pondPrepareModel: any, storageModel: any) {
        associations.pondpreparedetailsToStorage(this.model, storageModel);
        associations.pondpreparedetailsToPondPrepare(this.model, pondPrepareModel);
    }

    pondsAssociate(pondUserRolesModel: any, seasonAndPondModel: any, userModel: any, seasonModel: any) {
        associations.pondsToPondUserRoles(this.model, pondUserRolesModel);
        associations.pondsToSeasonAndPond(this.model, seasonAndPondModel);
        associations.pondsToUser(this.model, userModel);
        associations.pondsToUserEmployee(this.model, userModel);
        associations.pondToSeason(this.model, seasonModel);
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
        priceModel: any,
        userModel: any,
        seasonAndPondModel: any,
        pondsModel: any,
        rolesUserModel: any
    ) {
        associations.seasonToBoughtBreed(this.model, boughtBreedModel);
        associations.seasonToPrice(this.model, priceModel);
        associations.seasonToUser(this.model, userModel);
        associations.seasonToSNP(this.model, seasonAndPondModel);
        associations.seasonToPond(this.model, pondsModel);
        associations.seasonToUserRoles(this.model, rolesUserModel);
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
        storageOwnerModel: any,
        pondPrepareDetailModel: any,
        usingFoodModel: any,
        usingveterinaryModel: any
    ) {
        associations.storagesToMaterial(this.model, materialsModel);
        associations.storagesToOwner(this.model, storageOwnerModel);
        associations.storagesToPondPrePareDetail(this.model, pondPrepareDetailModel);
        associations.storagesToUsingFood(this.model, usingFoodModel);
        associations.storagesToUsingVeterinary(this.model, usingveterinaryModel);
    }

    storageOwnerAssociate(
        storageModel: any,
        userModel: any,
    ) {
        associations.ownerToStorage(this.model, storageModel);
        associations.ownerToUser(this.model, userModel);
    }

    breedOwnerAssociate(
        breedModel: any,
        userModel: any
    ) {
        associations.ownerBreedToBreed(this.model, breedModel);
        associations.ownerBreedToUser(this.model, userModel);
    }

    takecareAssociate(usingveterinaryModel: any, usingfoodsModel: any, seasonAndPondModel: any) {
        associations.takecareToSNP(this.model, seasonAndPondModel);
        associations.takecareToUsingfoods(this.model, usingfoodsModel);
        associations.takecareToUsingveterinary(this.model, usingveterinaryModel);
    }

    userRolesAssociate(
        pondUserRolesModel: any,
        userModel: any,
        seasonModel: any
    ) {
        associations.userrolesToPondUserRoles(this.model, pondUserRolesModel);
        associations.userrolesToUsers(this.model, userModel);
        associations.userrolesToUsersBoss(this.model, userModel);
        associations.userrolesToSeason(this.model, seasonModel);
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
        ownerStorageModel: any,
        breedOwnerModel: any,
        pondUserRolesModel: any
    ) {
        associations.userToDistrict(this.model, districtModel);
        associations.userToRolesUser(this.model, rolesUserModel);
        associations.userToPond(this.model, pondsModel);
        associations.userToPondRolesBelongMany(this.model, pondsModel);
        associations.userToCoupon(this.model, couponModel);
        associations.userToBoughtBreeds(this.model, boughtbreedsModel);
        associations.userToProvince(this.model, provinceModel);
        associations.userToSeason(this.model, seasonModel);
        associations.userToWard(this.model, wardModel);
        associations.userToRolesBoss(this.model, rolesUserModel);
        associations.userToOwnerStorage(this.model, ownerStorageModel);
        associations.userToOwnerBreed(this.model, breedOwnerModel);
        associations.userToPondUserRoles(this.model, pondUserRolesModel);
    }

    usingfoodsAssociate(storageModel: any, takecareModel: any) {
        associations.usingfoodsToStorage(this.model, storageModel);
        associations.usingfoodsToTakecare(this.model, takecareModel);
    }

    usingveterinaryAssociate(storageModel: any, takecareModel: any) {
        associations.usingveterinaryToStorage(this.model, storageModel);
        associations.usingveterinaryToTakecare(this.model, takecareModel);
    }

    wardAssociate(userModel: any) {
        associations.wardToUser(this.model, userModel);
    }
}
