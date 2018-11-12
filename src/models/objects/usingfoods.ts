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
            primaryKey: true
        },
        usingFoodUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        massOfFishery: {
            type: Sequelize.FLOAT
        },
        feedingRate: {
            type: Sequelize.FLOAT
        },
        totalFood: {
            type: Sequelize.FLOAT
        },
        createdBy: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            }
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'usingfoods'
    }
}, _.cloneDeep(baseModel));
