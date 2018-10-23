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

export function withPond(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
        foreignKey: {
            name: 'pondId',
            field: 'pondId'
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
