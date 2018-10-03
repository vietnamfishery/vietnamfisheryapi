import * as Sequeliz from 'sequelize';

export function harvestsToHarvestDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'harvests',
        foreignKey: {
            name: 'harvestId',
            field: 'harvestId'
        }
    });
}

export function harvestsToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'season',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}