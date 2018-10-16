import * as Sequeliz from 'sequelize';

export function couponToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'couponToMaterial',
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function couponToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'couponToUsers',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
