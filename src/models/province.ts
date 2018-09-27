import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const provinceOptions: any = _.merge({
    tableName: 'province'
},
{
    attributes: {
        provinceid: {
            type: Sequelize.STRING(5),
            primaryKey: true,
            field: 'provinceid'
        },
        name: {
            type: Sequelize.STRING(100),
            field: 'name'
        },
        type: {
            type: Sequelize.STRING(30),
            field: 'type'
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
