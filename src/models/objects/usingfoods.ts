import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const usingfoodOptions: any = _.merge({
    tableName: 'usingfoods'
},
{
    attributes: {
        usingFoodId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'usingFoodId'
        },
        usingFoodUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
            // field: 'usingFoodUUId'
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'takeCareId'
        },
        materialId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'materialId'
        },
        massOfFishery: {
            type: Sequelize.FLOAT,
            // field: 'massOfFishery'
        },
        feedingRate: {
            type: Sequelize.FLOAT,
            // field: 'feedingRate'
        },
        totalFood: {
            type: Sequelize.FLOAT,
            // field: 'totalFood'
        },
        createdBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
            // field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'createdDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
