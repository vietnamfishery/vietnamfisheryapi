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
        },
        bossId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
            index: true
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
        },
        roles: {
            type: Sequelize.INTEGER(11),
            unique: true,
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
        },
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'userroles'
    }
}, _.cloneDeep(baseModel));
