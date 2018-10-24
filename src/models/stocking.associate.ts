import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function stockingToSNP(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.STOCKING_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

//

export function stockingToStockingdetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.STOCKING_2_STOCKING_DETAILS,
        foreignKey: {
            name: 'stockingId',
            field: 'stockingId'
        }
    });
}
