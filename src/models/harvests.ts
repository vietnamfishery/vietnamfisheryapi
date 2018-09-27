import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const harvestOptions: any = _.merge({
    tableName: 'harvests'
},
{
    attributes: {
        harvestId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'harvestId'
        },
        harvestUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'harvestUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        harvestName: {
            type: Sequelize.STRING(50),
            field: 'harvestName'
        }
    },
    options: {
        createdBy: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
