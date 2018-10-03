import * as Sequeliz from 'sequelize';

export function toCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'coupon',
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function toStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
