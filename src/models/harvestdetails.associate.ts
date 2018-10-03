import * as Sequeliz from 'sequelize';

export function toHarvests(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'harvests',
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}
