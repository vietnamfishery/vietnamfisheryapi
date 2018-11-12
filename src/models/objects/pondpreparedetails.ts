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
        },
        pondPrepareDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        pondPrepareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        quantity: {
            type: Sequelize.FLOAT,
            allowNull: false,
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
        tableName: 'pondpreparedetails',
        createdBy: false,
        updatedBy: false
    }
}, _.cloneDeep(baseModel));
