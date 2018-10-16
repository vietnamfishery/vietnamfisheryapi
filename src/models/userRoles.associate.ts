import * as Sequeliz from 'sequelize';

export function userrolesToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'userrolesToUsers',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function userrolesPondUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userrolesPondUserRoles',
        foreignKey: {
            name: 'rolesId',
            field: 'rolesId'
        }
    });
}
