import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const stockingOptions: any = _.merge({
    tableName: 'stocking'
},
{
    attributes: {
        stockingId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'stockingId'
        },
        stockingUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'stockingUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'notes'
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
