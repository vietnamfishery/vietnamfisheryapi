import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function incurredsToPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.INCURREDS_TO_POND_PREPARE,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}

export function incurredsToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.INCURREDS_TO_USER,
        foreignKey: {
            name: 'ownerId',
            field: 'ownerId'
        }
    });
}
