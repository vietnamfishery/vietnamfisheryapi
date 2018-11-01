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
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'userId'
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
        tableName: 'coupons'
    }
}, _.cloneDeep(baseModel));
