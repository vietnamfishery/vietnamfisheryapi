import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function ponduserrolesToUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_USER_ROLE_2_USER_ROLE,
        foreignKey: {
            name: 'rolesId',
            field: 'rolesId'
        }
    });
}

export function ponduserrolesToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_USER_ROLE_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}
