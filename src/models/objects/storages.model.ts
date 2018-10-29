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
        },
        storageUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        productName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        quantityStorages: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        unit: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
        },
        type: {
            type: Sequelize.INTEGER(1)
        },
        descriptions: {
            type: Sequelize.TEXT,
            allowNull: true
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
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'storages'
    }
}, _.cloneDeep(baseModel));
