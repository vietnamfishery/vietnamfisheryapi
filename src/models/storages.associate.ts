import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function storagesToOwner(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STORAGE_2_OWNER,
        foreignKey: {
            name: 'ownerId',
            field: 'ownerId'
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

export function storagesToPondPrePareDetail(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_POND_PREPARE_DETAILS,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUsingFood(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_USING_FOOD,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUsingVeterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_USING_VETERINARY,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
