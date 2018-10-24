import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function districtToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.DISTRICT_2_USER,
        foreignKey: {
            name: 'districtid',
            field: 'districtid'
        }
    });
}

//
