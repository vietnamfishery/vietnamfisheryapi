import * as Sequeliz from 'sequelize';

export function districtToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'user',
        foreignKey: {
            name: 'districtid',
            field: 'districtid'
        }
    });
}
