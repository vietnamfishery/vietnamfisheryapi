import * as Sequeliz from 'sequelize';

export function userToRolesUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userToRolesUser',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userToPond',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userToCoupon',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'userToBoughtBreeds',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
}

export function userToProvince(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'pro',
        foreignKey: {
            name: 'province',
            field: 'province'
        }
    });
}

export function userToDistrict(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'dis',
        foreignKey: {
            field: 'district',
            name: 'district'
        }
    });
}

export function userToWard(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'war',
        foreignKey: {
            name: 'town',
            field: 'town'
        }
    });
}
