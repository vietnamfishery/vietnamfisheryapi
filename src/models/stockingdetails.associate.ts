import * as Sequeliz from 'sequelize';

export function toStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'stocking',
        foreignKey: {
            name: 'stockingId',
            field: 'stockingId'
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