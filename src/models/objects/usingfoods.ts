import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const usingfoodOptions: any = _.merge({
    tableName: 'usingfoods'
},
{
    attributes: {
        usingFoodUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'usingFoodUUId'
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'storageId'
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            unique: true,
            field: 'takeCareId'
        },
        massOfFishery: {
            type: Sequelize.FLOAT,
            field: 'massOfFishery'
        },
        feedingRate: {
            type: Sequelize.FLOAT,
            field: 'feedingRate'
        },
        totalFood: {
            type: Sequelize.FLOAT,
            field: 'totalFood'
        }
    },
    options: {
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
