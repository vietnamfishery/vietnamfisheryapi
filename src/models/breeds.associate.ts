import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function breedToBoughBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.BREED_2_BOUGHT_BREED_DETAIL,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function breedsToStockingDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.BREED_2_STOKING_DETAIL,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function breedsToOwnerBreed(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BREED_2_OWNER_BREED,
        foreignKey: {
            name: 'ownerId',
            field: 'ownerId'
        }
    });
}
