import * as Sequeliz from 'sequelize';

export function toBoughtBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'boughtbreeds',
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

export function toBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'breeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
