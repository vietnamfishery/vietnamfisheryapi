import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function stockingdetailsToStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STOCKING_DETAILS_2_STOCKING,
        foreignKey: {
            name: 'stockingId',
            field: 'stockingId'
        }
    });
}

export function stockingdetailsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STOCKING_DETAILS_2_BREED,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
