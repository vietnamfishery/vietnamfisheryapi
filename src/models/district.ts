import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const districtOptions: any = _.merge({
    tableName: 'district'
},
{
    attributes: {
        districtid: {
            type: Sequelize.STRING(5),
            primaryKey: true,
            field: 'districtid'
        },
        name: {
            type: Sequelize.STRING(100),
            field: 'name'
        },
        type: {
            type: Sequelize.STRING(30),
            field: 'type'
        },
        location: {
            type: Sequelize.STRING(30),
            field: 'location'
        },
        provinceid: {
            type: Sequelize.STRING(5),
            field: 'provinceid'
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
