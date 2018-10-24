import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function usingveterinaryToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USING_VETERINARY_2_MATERIAL,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function usingveterinaryToTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.USING_VETERINARY_2_TAKE_CARE,
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}
