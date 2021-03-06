import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function usingfoodsToStorage(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USING_FOOD_2_STORAGE,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function usingfoodsToTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USING_FOOD_2_TAKE_CARE,
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

//
