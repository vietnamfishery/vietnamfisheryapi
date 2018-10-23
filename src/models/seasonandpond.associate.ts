import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function withSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function withDiedFish(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_DIED_FISH,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withGrowths(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_DIED_FISH,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withHarvest(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_HARVEST,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withPondDiary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND_DIARY,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND_PREPARE,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
        }
    });
}

export function withPondEnv(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function withGrowth(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function SNPToTakeCare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    // return thatmodel.hasMany(model, {
    //     as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
    //     foreignKey: {
    //         name: 'seasonAndPondId',
    //         field: 'seasonAndPondId'
    //     }
    // });
}

export function SNPToStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    // return thatmodel.hasMany(model, {
    //     as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
    //     foreignKey: {
    //         name: 'seasonAndPondId',
    //         field: 'seasonAndPondId'
    //     }
    // });
}
