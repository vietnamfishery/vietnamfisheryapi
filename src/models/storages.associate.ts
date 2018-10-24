import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function storagesToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STORAGE_2_MATERIAL,
        foreignKey: {
            name: 'materialId',
            field: 'materialId'
        }
    });
}

export function storagesToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STORAGE_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
