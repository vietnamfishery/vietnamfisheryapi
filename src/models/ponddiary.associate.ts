import * as Sequeliz from 'sequelize';

export function ponddiaryToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'ponddiaryToSeason',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
