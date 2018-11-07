import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const userrolesOptions: any = _.merge({
    tableName: 'userroles'
},
{
    attributes: {
        rolesId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
            // field: 'rolesId'
        },
        bossId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
            // field: 'userId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
            // field: 'userId'
        },
        roles: {
            type: Sequelize.INTEGER(11),
            unique: true,
            // field: 'roles'
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
            allowNull: true,
            // field: 'updatedBy'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'userroles'
    }
}, _.cloneDeep(baseModel));
