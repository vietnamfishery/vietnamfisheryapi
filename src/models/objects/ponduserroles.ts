import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const ponduserrolesOptions: any = _.merge({
    tableName: 'ponduserroles'
},
    {
        attributes: {
            pondUserRolesId: {
                type: Sequelize.BIGINT(20),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                // field: 'rolesId'
            },
            userId: {
                type: Sequelize.BIGINT(20),
                unique: true,
                // field: 'pondId'
            },
            pondId: {
                type: Sequelize.BIGINT(20),
                unique: true,
                // field: 'pondId'
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
            defaultScope: {},
            scopes: {}
        }
    }, _.cloneDeep(baseModel));
