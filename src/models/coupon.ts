import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

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
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            unique: true,
            field: 'userId'
        },
        couponName: {
            type: Sequelize.STRING(100),
            field: 'couponName'
        },
        couponType: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'couponType'
        }
    },
    options: {
        createdBy: false,
        updatedBy: false
    }
}, _.cloneDeep(baseModel));