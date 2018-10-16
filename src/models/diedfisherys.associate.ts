import * as Sequeliz from 'sequelize';

export function diedfisherysToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'diedfisherysToSeason',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
