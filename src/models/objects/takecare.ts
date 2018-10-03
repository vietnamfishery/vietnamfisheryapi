import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const takecareOptions: any = _.merge({
    tableName: 'takecare'
},
{
    attributes: {
        takeCareId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'takeCareId'
        },
        takeCareUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'takeCareUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        takeCareName: {
            type: Sequelize.STRING(100),
            field: 'takeCareName'
        },
        takeType: {
            type: Sequelize.INTEGER(1),
            field: 'takeType'
        }
    },
    options: {
        createdBy: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
