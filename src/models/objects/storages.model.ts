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
            primaryKey: true
        },
        storageUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true
        },
        ownerId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        productName: {
            type: Sequelize.STRING(100)
        },
        quantityStorages: {
            type: Sequelize.FLOAT
        },
        unit: {
            type: Sequelize.INTEGER(1)
        },
        type: {
            type: Sequelize.INTEGER(1)
        },
        descriptions: {
            type: Sequelize.TEXT
        },
        createdDate: {
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
        tableName: 'storages'
    }
}, _.cloneDeep(baseModel));
