import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const ponduserrolesOptions: any = _.merge({
    tableName: 'ponduserroles'
},
    {
        attributes: {
            rolesId: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                field: 'rolesId'
            },
            pondId: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                unique: true,
                field: 'pondId'
            }
        },
        options: {
            //
        }
    }, _.cloneDeep(baseModel));
