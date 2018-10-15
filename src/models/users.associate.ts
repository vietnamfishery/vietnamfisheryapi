import * as Sequeliz from 'sequelize';

export function userToRolesUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userroles',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'ponds',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'coupon',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'boughtbreeds',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}
