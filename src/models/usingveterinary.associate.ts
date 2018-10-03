import * as Sequeliz from 'sequelize';

export function toStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'storages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function toTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'takeCare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}
