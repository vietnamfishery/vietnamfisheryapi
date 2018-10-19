import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondenvironmentoToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_ENVIRONMENT_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
