import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ownerBreedToBreed(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.OWNER_BREED_TO_BREED,
        foreignKey: {
            name: 'ownerId',
            field: 'ownerId'
        }
    });
}

export function ownerBreedToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.OWNER_BREED_TO_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
