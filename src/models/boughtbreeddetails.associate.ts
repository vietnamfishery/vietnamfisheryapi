import * as Sequeliz from 'sequelize';
import { ActionAssociateDatabase } from '../common';

export function boughtbreeddetailsToCoupon(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_COUPON,
        foreignKey: {
            name: 'couponId',
            field: 'couponId'
        }
    });
}

export function boughtbreeddetailsToBreeds(thatmodel: Sequeliz.Model<{}, any>, model: Sequeliz.Model<{}, any>) {
    return thatmodel.belongsTo(model, {
        as: ActionAssociateDatabase.BOUGHT_BREED_DETAIL_2_BREED,
        foreignKey: {
            name: 'breedId',
            field: 'breedId'
        }
    });
}
