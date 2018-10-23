import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ponddiaryToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_DIARY_2_SEASON,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}
