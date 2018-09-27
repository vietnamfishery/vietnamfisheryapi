import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const ponddiaryOptions: any = _.merge({
    tableName: 'ponddiary'
},
{
    attributes: {
        pondDiaryId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondDiaryId'
        },
        pondDiaryUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'pondDiaryUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            unique: true,
            field: 'seasonId'
        },
        fisheryQuantity: {
            type: Sequelize.FLOAT,
            field: 'fisheryQuantity'
        },
        healthOfFishery: {
            type: Sequelize.STRING,
            field: 'healthOfFishery'
        },
        pondVolume: {
            type: Sequelize.FLOAT,
            field: 'pondVolume'
        },
        diedFishery: {
            type: Sequelize.INTEGER(11),
            unique: true,
            field: 'diedFishery'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
