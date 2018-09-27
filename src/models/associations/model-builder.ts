import * as Sequeliz from 'sequelize';
import { rolesusersOptions } from '../rolesusers';

export class ModelBuilder {
    constructor(private model: Sequeliz.Model<{}, any>) {}

    public userToRolesUser(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'rolesUsers',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }

    public userToPond(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'ponds',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }

    public userToCoupon(model: Sequeliz.Model<{}, any>) {
        return this.model.hasMany(model, {
            as: 'coupon',
            foreignKey: {
                name: 'userId',
                field: 'UserId'
            }
        });
    }
}
