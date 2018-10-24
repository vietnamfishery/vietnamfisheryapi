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
            // field: 'pondPrepareDetailId'
        },
        pondPrepareDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'pondPrepareDetailUUId'
        },
        materialId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'materialId'
        },
        pondPrepareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'pondPrepareId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
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
        createdBy: false,
        updatedBy: false
    }
}, _.cloneDeep(baseModel));
