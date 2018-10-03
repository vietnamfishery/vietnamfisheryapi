import * as Sequeliz from 'sequelize';

export function toMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'coupon',
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
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
