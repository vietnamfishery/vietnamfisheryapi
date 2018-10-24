import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const pondprepareOptions: any = _.merge({
    tableName: 'pondprepare'
},
{
    attributes: {
        pondPrepareId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'pondPrepareId'
        },
        pondPrepareUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'pondPrepareUUId'
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'seasonAndPondId'
        },
        pondprepareName: {
            type: Sequelize.STRING(50),
            // field: 'pondprepareName'
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true,
            // field: 'notes'
        },
        createdBy: {
            type: Sequelize.STRING(36),
            // field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'createdDate'
        },
        updatedBy: {
            type: Sequelize.STRING(36),
            // field: 'updatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
