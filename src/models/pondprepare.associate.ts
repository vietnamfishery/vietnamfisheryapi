import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondprepareToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_SEASON,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function pondprepareToPondPrepareDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_POND_PREPARE_DETAILS,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}

export function pondprepareToCosts(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_COST,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}
