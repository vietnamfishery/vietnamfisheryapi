import * as Sequeliz from 'sequelize';

export function provinceToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'user',
        foreignKey: {
            name: 'provinceid',
            field: 'provinceid'
        }
    });
}
