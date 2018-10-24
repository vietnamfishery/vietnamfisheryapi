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
                allowNull: false,
                // field: 'rolesId'
            },
            pondId: {
                type: Sequelize.BIGINT(20),
                primaryKey: true,
                unique: true,
                // field: 'pondId'
            },
            isDeleted: {
                type: Sequelize.INTEGER(1),
                defaultValue: 0,
                // field: 'isDeleted'
            }
        },
        options: {
            defaultScope: {},
            scopes: {}
        }
    }, _.cloneDeep(baseModel));
