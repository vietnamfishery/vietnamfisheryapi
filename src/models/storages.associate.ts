import * as Sequeliz from 'sequelize';

export function storagesToPondpreparedetails(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storagesToPondpreparedetails',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToMaterial(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storagesToMaterial',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToPrices(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storagesToPrices',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storagesToUsingfoods',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function storagesToUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'storagesToUsingveterinary',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
