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
        },
        materialUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        couponId : {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        storageId : {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        provider: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        providerAddress: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        quantity: {
            type: Sequelize.FLOAT,
        },
        unit: {
            type: Sequelize.INTEGER(1),
        },
        unitPrice: {
            type: Sequelize.FLOAT,
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
        }
    },
    options: {
        tableName: 'materials'
    }
}, _.cloneDeep(baseModel));
