import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function seasonToPonds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function seasonToPonddiary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_POND_DIARY,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToPondprepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_POND_PREPARE,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_TAKE_CARE,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToGrowths(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_GROWTH,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToDiedfisherys(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_DIED_FISHERY,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToPondenvironments(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_POND_ENVIRONMENT,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_STOCKING,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToHarvest(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_HARVETS,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function seasonToSeasonAndPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
