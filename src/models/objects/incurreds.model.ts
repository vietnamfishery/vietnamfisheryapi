import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const incurredsOptions: any = _.merge({
    tableName: 'incurreds'
},
{
    attributes: {
        incurredId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        incurredUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        pondPrepareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        incurredName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        value: {
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
        tableName: 'incurreds',
        createdBy: false,
        updatedBy: false
    }
}, _.cloneDeep(baseModel));
