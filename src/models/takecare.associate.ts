import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function takecareToSNP(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.TAKE_CARE_2_SEASON_AND_POND,
        foreignKey: {
            name: 'seasonAndPondId',
            field: 'seasonAndPondId'
        }
    });
}

export function takecareToUsingfoods(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.TAKE_CARE_2_USING_FOOD,
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}

//

export function takecareToUsingveterinary(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.hasMany(model, {
        as: ActionAssociateDatabase.TAKE_CARE_2_USING_VETERINARY,
        foreignKey: {
            name: 'takeCareId',
            field: 'takeCareId'
        }
    });
}
