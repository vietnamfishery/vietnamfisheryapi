import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const harvestdetailOptions: any = _.merge({
    tableName: 'harvestdetails'
},
{
    attributes: {
        harvestIdDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'harvestIdDetailUUId'
        },
        harvestId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'harvestId'
        },
        breedName: {
            type: Sequelize.STRING(80),
            field: 'breedName'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            field: 'unitPrice'
        }
    },
    options: {
        createdBy: false,
        createdDate: false,
        updatedBy: false,
        updatedDate: false,
    }
}, _.cloneDeep(baseModel));
