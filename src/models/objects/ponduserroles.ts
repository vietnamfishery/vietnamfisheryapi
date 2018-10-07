import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const ponduserrolesOptions: any = _.merge({
    tableName: 'ponduserroles'
},
{
    attributes: {
        userId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'userId'
        },
        useUserId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'useUserId'
        },
        pondId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondId'
        }
    },
    options: {
        createdBy: false,
        createdDate: false,
        updatedBy: false,
        updatedDate: false,
        isDeleted: false
    }
}, _.cloneDeep(baseModel));
