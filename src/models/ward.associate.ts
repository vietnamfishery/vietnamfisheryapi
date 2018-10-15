import * as Sequeliz from 'sequelize';

export function wardToUser(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'user',
        foreignKey: {
            name: 'wardid',
            field: 'wardid'
        }
    });
}
