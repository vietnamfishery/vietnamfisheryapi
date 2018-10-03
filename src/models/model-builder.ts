import * as Sequeliz from 'sequelize';

import * as associations from './';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public userAssociate(rolesUsersModel: any, pondsModel: any, couponModel: any, boughtbreedsModel: any) {
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

    public storagesAssociate(pondpreparedetailsModel: any, MaterialsModel: any, PricesModel: any, UsingfoodsModel: any, UsingveterinaryModel: any) {
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

}
