import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondenvironmenToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_ENVIRONMENT_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}
