import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function seasonToBoughtBreed(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_BOUGHT_BREED,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_COUPON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToPrice(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_COUPON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function seasonToSNP(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToStorage(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_STORAGE,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

//
