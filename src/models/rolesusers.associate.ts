import * as Sequeliz from 'sequelize';

export function rolesusersToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'users',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}

export function rolesusersToPonds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'ponds',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}
