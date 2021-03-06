import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const growthOptions: any = _.merge({
    tableName: 'growths'
},
{
    attributes: {
        growthId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'growthId'
        },
        growthUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'growthUUId'
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'seasonAndPondId'
        },
        averageDensity: {
            type: Sequelize.FLOAT,
            // field: 'averageDensity'
        },
        averageMass: {
            type: Sequelize.FLOAT,
            // field: 'averageMass'
        },
        speedOdGrowth: {
            type: Sequelize.FLOAT,
            // field: 'speedOdGrowth'
        },
        livingRatio: {
            type: Sequelize.FLOAT,
            // field: 'livingRatio'
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
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
            // field: 'updatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'growths'
    }
}, _.cloneDeep(baseModel));
