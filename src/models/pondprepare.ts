import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const pondprepareOptions: any = _.merge({
    tableName: 'pondprepare'
},
{
    attributes: {
        pondPrepareId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondPrepareId'
        },
        pondPrepareUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'pondPrepareUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        pondprepareName: {
            type: Sequelize.STRING(50),
            field: 'pondprepareName'
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'notes'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
