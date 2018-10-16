import * as Sequeliz from 'sequelize';

export function boughtbreeddetailsToBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'boughtbreeddetailsToBoughtBreeds',
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

export function boughtbreeddetailsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'boughtbreeddetailsToBreeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
