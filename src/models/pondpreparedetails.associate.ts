import * as Sequeliz from 'sequelize';

export function pondpreparedetailsToPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'pondpreparedetailsToPondPrepare',
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}

export function pondpreparedetailsToStorages(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'pondpreparedetailsToStorages',
        foreignKey: {
            name: 'storageId',
            field: 'storageId'
        }
    });
}
