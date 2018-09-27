import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const diedfisherysOptions: any = _.merge({
    tableName: 'diedfisherys'
},
{
    attributes: {
        diedFisheryId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'diedFisheryId'
        },
        diedFisheryUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'diedFisheryUUId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonId'
        },
        card: {
            type: Sequelize.STRING(100),
            field: 'card'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        solutions: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'solutions'
        },
        employee: {
            type: Sequelize.STRING(50),
            allowNull: true,
            field: 'employee'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
