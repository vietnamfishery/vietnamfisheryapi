import * as Sequeliz from 'sequelize';

export function toRolesusers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'ponds',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function toSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'ponds',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function toUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'users',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
