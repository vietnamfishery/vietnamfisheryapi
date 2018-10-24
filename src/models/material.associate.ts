import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function materialToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.MATERIAL_2_COUPON,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function materialToPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.MATERIAL_2_POND_PREPARE,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function materialToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasOne(model, {
        as: ActionAssociateDatabase.MATERIAL_2_STORAGE,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function materialToUsingFood(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.MATERIAL_2_USING_FOOD,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function materialToUsingVeterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.MATERIAL_2_USING_VETERINARY,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

//
