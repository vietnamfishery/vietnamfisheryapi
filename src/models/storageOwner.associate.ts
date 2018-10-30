import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ownerToStorage(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STORAGE_2_OWNER,
        foreignKey: {
            name: 'storageOwnerId',
            field: 'storageOwnerId'
        }
    });
}

export function ownerToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.OWNER_TO_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
