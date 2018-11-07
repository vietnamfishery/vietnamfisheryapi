import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ponduserrolesToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_USER_ROLE_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function ponduserrolesToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_USER_ROLE_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

//
