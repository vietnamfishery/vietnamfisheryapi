import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function diedfisherysToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.DIED_FISHERY_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
