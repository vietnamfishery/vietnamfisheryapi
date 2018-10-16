import * as Sequeliz from 'sequelize';

export function costsToPondPrepare(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'costsToPondPrepare',
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}
