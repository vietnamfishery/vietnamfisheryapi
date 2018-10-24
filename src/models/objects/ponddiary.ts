import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const ponddiaryOptions: any = _.merge({
    tableName: 'ponddiary'
},
{
    attributes: {
        pondDiaryId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'pondDiaryId'
        },
        pondDiaryUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
            // field: 'pondDiaryUUId'
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'seasonAndPondId'
        },
        fisheryQuantity: {
            type: Sequelize.FLOAT,
            // field: 'fisheryQuantity'
        },
        healthOfFishery: {
            type: Sequelize.STRING(36),
            // field: 'healthOfFishery'
        },
        pondVolume: {
            type: Sequelize.FLOAT,
            // field: 'pondVolume'
        },
        diedFishery: {
            type: Sequelize.INTEGER(11),
            // field: 'diedFishery'
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
            defaultValue: 0,
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
