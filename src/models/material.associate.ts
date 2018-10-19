import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function materialToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.MATERIAL_2_COUPON,
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function materialToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.MATERIAL_2_STORAGE,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
