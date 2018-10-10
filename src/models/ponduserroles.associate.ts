import * as Sequeliz from 'sequelize';

export function ponduserrolesToUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'userRoles',
        foreignKey: {
            name: 'rolesId',
            field: 'rolesId'
        }
    });
}
