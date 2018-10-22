import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function withSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function withPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}
