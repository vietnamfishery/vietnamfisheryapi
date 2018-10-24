import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function harvestdetailsToHarvests(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.HARVEST_DETAIL_2_HARVEST,
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}

//
