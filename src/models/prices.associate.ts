import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pricesToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.PRICE_2_STORAGE,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
