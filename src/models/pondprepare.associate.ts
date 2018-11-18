import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function pondprepareToCosts(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_COST,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}

export function pondprepareToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_SEASON_AND_POND,
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

export function pondprepareToIncurred(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.POND_PREPARE_2_INCURREDS,
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}
