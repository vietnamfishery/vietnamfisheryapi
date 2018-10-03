import * as Sequeliz from 'sequelize';

export function toPondpreparedetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function toMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function toPrices(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function toUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function toUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
