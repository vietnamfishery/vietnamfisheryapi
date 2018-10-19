import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function wardToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.WARD_2_USER,
        foreignKey: {
            name: 'wardid',
            field: 'wardid'
        }
    });
}
