import * as Sequeliz from 'sequelize';

export function growthsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'growthsToSeason',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
