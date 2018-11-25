import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function boughtbreedsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function boughtbreedsToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

//
