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
        materialId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'materialId'
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
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
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
