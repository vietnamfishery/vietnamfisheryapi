import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const storagesOptions: any = _.merge({
    tableName: 'storages'
},
{
    attributes: {
        storageId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'storageId'
        },
        storageUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'storageUUId'
        },
        unitName: {
            type: Sequelize.STRING(50),
            field: 'unitName'
        },
        unitType: {
            type: Sequelize.INTEGER(1),
            field: 'unitType'
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'description'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'updatedDate'
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
