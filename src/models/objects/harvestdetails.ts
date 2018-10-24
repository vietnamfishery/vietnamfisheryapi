import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const harvestdetailOptions: any = _.merge({
    tableName: 'harvestdetails'
},
{
    attributes: {
        harvestIdDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'harvestIdDetailUUId'
        },
        harvestId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'harvestId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            // field: 'unitPrice'
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
