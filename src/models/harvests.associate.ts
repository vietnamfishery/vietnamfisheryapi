import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function harvestsToHarvestDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.HARVEST_2_HARVEST_DETAILS,
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}

export function harvestsToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.HARVEST_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

//
