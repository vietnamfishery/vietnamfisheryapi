import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondsToPondUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

//

export function pondsToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_2_SEASON_AND_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function pondsToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_2_USER,
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function pondsToUserEmployee(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsToMany(model, {
        as: ActionAssociateDatabase.POND_2_EMPLOYEE,
        through: 'ponduserroles',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        },
        otherKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
