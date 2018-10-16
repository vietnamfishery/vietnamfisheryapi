import * as Sequeliz from 'sequelize';

export function boughtbreedsToBoughtBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'boughtbreedsToBoughtBreedDetails',
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

export function boughtbreedsToUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'boughtbreedsToUsers',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
