import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

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
