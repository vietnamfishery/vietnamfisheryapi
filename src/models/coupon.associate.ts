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

export function couponToBoughtBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.COUPON_2_BOUGHT_BREED_DETAILS,
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

export function couponToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.COUPON_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
