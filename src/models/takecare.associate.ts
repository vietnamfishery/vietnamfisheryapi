import * as Sequeliz from 'sequelize';

export function takecareToUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takecareToUsingveterinary',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function takecareToUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: 'takecareToUsingfoods',
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

export function takecareToSeason(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: 'takecareToSeason',
        foreignKey: {
            name: 'seasonId',
            field: 'seasonId'
        }
    });
}
