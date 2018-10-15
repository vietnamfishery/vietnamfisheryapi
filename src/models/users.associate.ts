import * as Sequeliz from 'sequelize';

export function userToRolesUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.hasMany(model, {
        as: 'userroles',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
    return thatmodel;
}

export function userToPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.hasMany(model, {
        as: 'ponds',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
    return thatmodel;
}

export function userToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.hasMany(model, {
        as: 'coupon',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
    return thatmodel;
}

export function userToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.hasMany(model, {
        as: 'boughtbreeds',
        foreignKey: {
            name: 'userId',
            field: 'UserId'
        }
    });
    return thatmodel;
}

export function userToProvince(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.belongsTo(model, {
        as: 'province',
        foreignKey: {
            name: 'provinceid',
            field: 'provinceid'
        }
    });
    return thatmodel;
}

export function userToDistrict(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.belongsTo(model, {
        as: 'district',
        foreignKey: {
            name: 'districtid',
            field: 'districtid'
        }
    });
    return thatmodel;
}

export function userToWard(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>): Sequeliz.Model<{}, any> {
    thatmodel.belongsTo(model, {
        as: 'ward',
        foreignKey: {
            name: 'wardid',
            field: 'wardid'
        }
    });
    return thatmodel;
}
