import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const pondpreparedetailOptions: any = _.merge({
    tableName: 'pondpreparedetails'
},
{
    attributes: {
        pondPrepareDetailId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondPrepareDetailId'
        },
        pondPrepareDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'pondPrepareDetailUUId'
        },
        pondPrepareId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondPrepareId'
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'storageId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
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
        createdBy: false,
        updatedBy: false
    }
}, _.cloneDeep(baseModel));
