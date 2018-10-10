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
            field: 'rolesId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            field: 'userId'
        },
        roles: {
            type: Sequelize.INTEGER(11),
            field: 'roles'
        }
    },
    options: {
        createdBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
