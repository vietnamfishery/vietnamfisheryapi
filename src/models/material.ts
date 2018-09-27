import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const materialOptions: any = _.merge({
    tableName: 'material'
},
{
    attributes: {
        materialUUId: {
            type: Sequelize.STRING(36),
            field: 'materialUUId'
        },
        couponId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'couponId'
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'storageId'
        },
        provider: {
            type: Sequelize.STRING(100),
            allowNull: true,
            field: 'provider'
        },
        providerAddress: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'providerAddress'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        unit: {
            type: Sequelize.INTEGER(1),
            field: 'unit'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            field: 'unitPrice'
        },
        dom: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'dom'
        },
        ed: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'ed'
        },
        prodcutionBatch: {
            type: Sequelize.STRING(100),
            field: 'prodcutionBatch'
        }
    },
    options: {
        createdBy: false,
        createdDate: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));