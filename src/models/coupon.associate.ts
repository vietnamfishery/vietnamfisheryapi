import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function couponToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.COUPON_2_MATERIAL,
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function couponToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.COUPON_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
