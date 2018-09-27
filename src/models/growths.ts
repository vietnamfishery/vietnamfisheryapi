import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const growthOptions: any = _.merge({
    tableName: 'growths'
},
{
    attributes: {
        growthId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'growthId'
        },
        growthUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'growthUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            unique: true,
            field: 'seasonId'
        },
        averageDensity: {
            type: Sequelize.FLOAT,
            field: 'averageDensity'
        },
        averageMass: {
            type: Sequelize.FLOAT,
            field: 'averageMass'
        },
        speedOdGrowth: {
            type: Sequelize.FLOAT,
            field: 'speedOdGrowth'
        },
        livingRatio: {
            type: Sequelize.FLOAT,
            field: 'livingRatio'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
