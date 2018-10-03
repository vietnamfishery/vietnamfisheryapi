import * as Sequeliz from 'sequelize';

export function toBoughtBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'breeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function toStockingDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'breeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
