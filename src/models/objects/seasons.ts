import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const seasonOptions: any = _.merge({
    tableName: 'seasons'
},
{
    attributes: {
        seasonId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'seasonId'
        },
        seasonUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'seasonUUId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'userId'
        },
        seasonName: {
            type: Sequelize.STRING(100),
            // field: 'seasonName'
        },
        status: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            // field: 'seasonName'
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
