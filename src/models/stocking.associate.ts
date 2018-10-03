import * as Sequeliz from 'sequelize';

export function stockingToStockingdetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'stocking',
        foreignKey: {
            name: 'stockingId',
            field: 'stockingId'
        }
    });
}

export function stockingToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'season',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
