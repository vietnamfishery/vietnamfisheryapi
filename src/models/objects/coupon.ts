import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const couponOptions: any = _.merge({
    tableName: 'coupon'
},
{
    attributes: {
        couponId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'couponId'
        },
        couponUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'couponUUId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            field: 'userId'
        },
        couponName: {
            type: Sequelize.STRING(100),
            field: 'couponName'
        },
        couponType: {
            type: Sequelize.INTEGER(1),
            field: 'couponType'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
