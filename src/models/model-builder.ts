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
        associations.boughtbreeddetailsToBreeds(this.model, usersModel);
    }
}
