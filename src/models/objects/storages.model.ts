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
        userId: {
            type: Sequelize.BIGINT(20),
            field: 'userId'
        },
        itemName: {
            type: Sequelize.STRING(100),
            field: 'itemName'
        },
        itemType: {
            type: Sequelize.INTEGER(1),
            field: 'itemType'
        },
        description: {
            type: Sequelize.TEXT,
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
