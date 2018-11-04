import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function userrolesToPondUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.USER_ROLES_2_POND_USER_ROLE,
        foreignKey: {
            name: 'rolesId',
            field: 'rolesId'
        }
    });
}

export function userrolesToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USER_ROLES_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userrolesToUsersBoss(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
        foreignKey: {
            name: 'bossId',
            field: 'bossId'
        }
    });
}

//
