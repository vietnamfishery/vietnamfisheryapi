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
            primaryKey: true
        },
        pondDiaryUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        fisheryQuantity: {
            type: Sequelize.FLOAT
        },
        healthOfFishery: {
            type: Sequelize.STRING(36)
        },
        pondVolume: {
            type: Sequelize.FLOAT
        },
        diedFishery: {
            type: Sequelize.INTEGER(11)
        },
        notes: {
            type: Sequelize.TEXT
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
            },
        },
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        updatedDate: {
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
        tableName: 'ponddiary'
    }
}, _.cloneDeep(baseModel));
