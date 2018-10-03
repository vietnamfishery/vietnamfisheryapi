import * as Sequeliz from 'sequelize';

export function takecareToUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takeCare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function takecareToUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takeCare',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function takecareToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'season',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
