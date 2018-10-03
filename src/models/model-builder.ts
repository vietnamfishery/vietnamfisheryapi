import * as Sequeliz from 'sequelize';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public userAssociate(rolesUsersModel: any, pondsModel: any, couponModel: any, boughtbreedsModel: any) {
        this.userToRolesUser(rolesUsersModel);
        this.userToPond(pondsModel);
        this.userToCoupon(couponModel);
        this.userToBoughtBreeds(boughtbreedsModel);
    }

    private userToRolesUser(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'rolesUsers',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }

    private userToPond(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'ponds',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }

    private userToCoupon(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'coupon',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }

    private userToBoughtBreeds(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'boughtbreeds',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }
}
