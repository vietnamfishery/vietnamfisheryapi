import * as Sequeliz from 'sequelize';

export function pondsToponduserroles(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasOne(model, {
        as: 'pondsToponduserroles',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function pondsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'pondsToSeason',
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function pondsToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'pondsToUsers',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
