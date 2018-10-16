import * as Sequeliz from 'sequelize';

export function ponduserrolesToUserRoles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'ponduserrolesToUserRoles',
        foreignKey: {
            name: 'rolesId',
            field: 'rolesId'
        }
    });
}

export function ponduserrolesToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'ponduserrolesToPond',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}
