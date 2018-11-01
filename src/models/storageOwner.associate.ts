import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ownerToStorage(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.OWNER_TO_STORAGE,
        foreignKey: {
            name: 'ownerId',
            field: 'ownerId'
        }
    });
}

export function ownerToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.OWNER_TO_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
