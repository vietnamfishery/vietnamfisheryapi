import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function boughtbreedsToBoughtBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_2_BOUGHT_BREED_DETAIL,
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

export function boughtbreedsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_2_USER,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function boughtbreedsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_2_USER,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

//
