import * as Sequeliz from 'sequelize';

export function materialToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'materialToCoupon',
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function materialToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'materialToStorages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
