import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const pricesOptions: any = _.merge({
    tableName: 'prices'
},
{
    attributes: {
        priceId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'priceId'
        },
        priceUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'priceUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            unique: true,
            allowNull: false,
            // field: 'seasonId'
        },
        totalCost: {
            type: Sequelize.DOUBLE,
            // field: 'totalCost'
        },
        totalProfit: {
            type: Sequelize.DOUBLE,
            // field: 'totalProfit'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'createdDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
