import * as Sequeliz from 'sequelize';

export function usingfoodsToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'usingfoodsToStorages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}

export function usingfoodsToTakecare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'usingfoodsToTakecare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}
