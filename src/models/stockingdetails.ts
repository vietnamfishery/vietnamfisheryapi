import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const stockingdetailOptions: any = _.merge({
    tableName: 'stockingdetails'
},
{
    attributes: {
        stockingDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'stockingDetailUUId'
        },
        breedId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'breedId'
        },
        stockingId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'stockingId'
        },
        costOfStocking: {
            type: Sequelize.FLOAT,
            field: 'costOfStocking'
        },
        stockingQuantity: {
            type: Sequelize.BIGINT(20),
            field: 'stockingQuantity'
        },
        phFirst: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'phFirst'
        },
        salinityFirst: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'salinityFirst'
        }
    },
    options: {
        createdBy: false,
        createdDate: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
