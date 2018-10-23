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
        userId: {
            type: Sequelize.BIGINT(20),
            unique: true
            // field: 'userId'
        },
        roles: {
            type: Sequelize.INTEGER(11),
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
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'updatedBy'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
