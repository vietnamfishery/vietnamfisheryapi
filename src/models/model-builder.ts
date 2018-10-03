import * as Sequeliz from 'sequelize';

import * as userAssociations from './users.associate';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public userAssociate(rolesUsersModel: any, pondsModel: any, couponModel: any, boughtbreedsModel: any) {
        userAssociations.userToRolesUser(this.model, rolesUsersModel);
        userAssociations.userToPond(this.model, pondsModel);
        userAssociations.userToCoupon(this.model, couponModel);
        userAssociations.userToBoughtBreeds(this.model, boughtbreedsModel);
    }

    public boughtbreeddetailsAssociate(boughtBreedsModel: any, breedsModel: any) {
        //
    }
}
