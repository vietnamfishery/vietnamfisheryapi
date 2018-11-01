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
            // field: 'storageId'
        },
        storageUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
            // field: 'storageUUId'
        },
        ownerId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'userId'
        },
        productName: {
            type: Sequelize.STRING(100),
            // field: 'productName'
        },
        quantityStorages: {
            type: Sequelize.FLOAT,
            // field: 'quantityStorages'
        },
        unit: {
            type: Sequelize.INTEGER(1),
            // field: 'unit'
        },
        type: {
            type: Sequelize.INTEGER(1),
            // field: 'type'
        },
        descriptions: {
            type: Sequelize.TEXT,
            // field: 'descriptions'
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
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'storages'
    }
}, _.cloneDeep(baseModel));
