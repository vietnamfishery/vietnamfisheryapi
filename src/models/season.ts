import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const seasonOptions: any = _.merge({
    tableName: 'season'
},
{
    attributes: {
        seasonId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'seasonId'
        },
        seasonUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'seasonUUId'
        },
        pondId: {
            type: Sequelize.BIGINT(20),
            field: 'pondId'
        },
        seasonName: {
            type: Sequelize.STRING(100),
            field: 'seasonName'
        }
    },
    options: {
        createdBy: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
