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
        materialId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'materialId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'seasonId'
        },
        quantityStorages: {
            type: Sequelize.FLOAT,
            // field: 'quantityStorages'
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
