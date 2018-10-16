import * as Sequeliz from 'sequelize';

export function harvestdetailsToHarvests(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'harvestdetailsToHarvests',
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}
