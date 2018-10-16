import * as Sequeliz from 'sequelize';

export function toBoughToBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'toBoughToBreedDetails',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}

export function breedsToStockingDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'breedsToStockingDetails',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
