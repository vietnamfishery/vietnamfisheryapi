import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const couponOptions: any = _.merge({
    tableName: 'coupons'
},
{
    attributes: {
        couponId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'couponId'
        },
        // userId: {
        //     type: Sequelize.BIGINT(20),
        //     field: 'userId'
        // },
        seasonId: {
            type: Sequelize.BIGINT(20),
            // field: 'seasonId',
            allowNull: false,
        },
        materialId: {
            type: Sequelize.BIGINT(20),
            // field: 'materialId',
            allowNull: false,
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        unitPrices: {
            type: Sequelize.DOUBLE,
            // field: 'unitPrices'
        },
        providerInfo: {
            type: Sequelize.STRING,
            // field: 'providerInfo',
            allowNull: true,
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
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
