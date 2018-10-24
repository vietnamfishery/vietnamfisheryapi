import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function boughtbreeddetailsToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BOUGHT_BREED,
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

//

export function boughtbreeddetailsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BREED,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
