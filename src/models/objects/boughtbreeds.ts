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
        },
        boughtBreedUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
        }
    },
    options: {
        tableName: 'boughtbreeds'
    }
}, _.cloneDeep(baseModel));
