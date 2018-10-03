import * as Sequeliz from 'sequelize';

export function toUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takeCare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function toUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takeCare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function toSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'season',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
