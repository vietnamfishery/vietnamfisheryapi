import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function usingfoodsToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USING_FOOD_2_MATERIAL,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
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
