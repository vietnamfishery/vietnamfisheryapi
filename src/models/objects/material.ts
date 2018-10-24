import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const materialOptions: any = _.merge({
    tableName: 'materials'
},
{
    attributes: {
        materialId : {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'materialId'
        },
        materialUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'materialUUId'
        },
        itemName: {
            type: Sequelize.STRING(100),
            // field: 'itemName'
        },
        provider: {
            type: Sequelize.STRING(100),
            // field: 'provider'
        },
        providerAddress: {
            type: Sequelize.STRING,
            // field: 'providerAddress'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        unit: {
            type: Sequelize.INTEGER(1),
            // field: 'unit'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            // field: 'unitPrice'
        },
        dom: {
            type: Sequelize.DATE,
            allowNull: true,
            // field: 'dom'
        },
        ed: {
            type: Sequelize.DATE,
            allowNull: true,
            // field: 'ed'
        },
        prodcutionBatch: {
            type: Sequelize.STRING(100),
            allowNull: true,
            // field: 'prodcutionBatch'
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
