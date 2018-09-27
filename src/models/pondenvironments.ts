import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const pondenvironmentsOptions: any = _.merge({
    tableName: 'pondenvironments'
},
{
    attributes: {
        pondEnvironmentId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondEnvironmentId'
        },
        pondEnvironmentUUId: {
            type: Sequelize.STRING(36),
            field: 'pondEnvironmentUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        oxyMorning: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'oxyMorning'
        },
        oxyAfternoon: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'oxyAfternoon'
        },
        phMorning: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'phMorning'
        },
        phAfternoon: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'phAfternoon'
        },
        transparent: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'transparent'
        },
        salinity: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'salinity'
        },
        h2s: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'h2s'
        },
        nh3: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'nh3'
        },
        bazo: {
            type: Sequelize.FLOAT,
            allowNull: true,
            field: 'bazo'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
