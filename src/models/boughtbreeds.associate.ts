import * as Sequeliz from 'sequelize';

export function toBoughtBreedDetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'boughtbreeds',
        foreignKey: {
            name: 'boughtBreedId',
            field: 'boughtBreedId'
        }
    });
}

export function toUsers(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'users',
        foreignKey: {
            name: 'userId',
            field: 'userId'
        }
    });
}
