import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const seasonandpondOptions: any = _.merge({
    tableName: 'seasonandpond'
},
{
    attributes: {
        seasonAndPondId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'seasonAndPondId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        pondId: {
            type: Sequelize.BIGINT(20),
            field: 'pondId'
        }
    },
    options: {
        //
    }
});