import * as Sequeliz from 'sequelize';

export function harvestsToHarvestDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'harvestsToHarvestDetails',
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}

export function harvestsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'harvestsToSeason',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
