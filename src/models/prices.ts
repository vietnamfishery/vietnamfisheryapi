import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
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
            field: 'priceId'
        },
        priceUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'priceUUId'
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            field: 'storageId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        unit: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            field: 'unit'
        },
        value: {
            type: Sequelize.FLOAT,
            field: 'value'
        }
    },
    options: {
        createdBy: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
