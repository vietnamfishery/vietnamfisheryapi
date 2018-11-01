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
