import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function provinceToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.PROVINCE_2_USER,
        foreignKey: {
            name: 'provinceid',
            field: 'provinceid'
        }
    });
}

//
