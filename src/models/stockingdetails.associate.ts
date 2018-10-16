import * as Sequeliz from 'sequelize';

export function stockingdetailsToStocking(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'stockingdetailsToStocking',
        foreignKey: {
            name: 'stockingId',
            field: 'stockingId'
        }
    });
}

export function stockingdetailsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'stockingdetailsToBreeds',
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
