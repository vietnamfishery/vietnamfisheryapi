import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondpreparedetailsToPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_POND_PREPARE,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}

export function pondpreparedetailsToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_STORAGE,
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
