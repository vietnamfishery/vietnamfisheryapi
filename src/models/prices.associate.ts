import * as Sequeliz from 'sequelize';

export function pricesToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'pricesToStorages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
