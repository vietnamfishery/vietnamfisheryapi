import * as Sequeliz from 'sequelize';

export function pondprepareToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'season',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}

export function pondprepareToCosts(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'pondprepare',
        foreignKey: {
            name: 'pondPrepareId',
            field: 'pondPrepareId'
        }
    });
}