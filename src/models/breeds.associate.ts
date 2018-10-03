import * as Sequeliz from 'sequelize';

export function toBoughToBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'breeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function breedsToStockingDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'breeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
