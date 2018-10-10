import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const costsOptions: any = _.merge({
    tableName: 'costs'
},
{
    attributes: {
        costId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'costId'
        },
        costUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'costUUId'
        },
        pondPrepareId: {
            type: Sequelize.BIGINT(20),
            field: 'pondPrepareId'
        },
        label: {
            type: Sequelize.STRING(100),
            field: 'label'
        },
        value: {
            type: Sequelize.FLOAT,
            field: 'value'
        },
        responsible: {
            type: Sequelize.STRING(100),
            field: 'responsible'
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'notes'
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'updatedBy'
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
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
