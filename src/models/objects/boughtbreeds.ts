import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const boughtbreedOptions: any = _.merge({
    tableName: 'boughtbreeds'
},
{
    attributes: {
        boughtBreedId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'boughtBreedId'
        },
        boughtBreedUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'boughtBreedUUId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            // field: 'breedId',
            unique: true,
            allowNull: false,
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            // field: 'seasonId',
            allowNull: false,
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
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'boughtbreeds'
    }
}, _.cloneDeep(baseModel));
