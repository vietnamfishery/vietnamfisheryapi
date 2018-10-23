import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function storagesToPondpreparedetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_POND_PREPARE_DETAILS,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_MATERIAL,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToPrices(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_PRICE,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_USING_FOOD,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasOne(model, {
        as: ActionAssociateDatabase.STORAGE_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function storagesToUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_USING_VETERINARY,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
