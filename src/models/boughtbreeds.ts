import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const boughtbreedOptions: any = _.merge({
    tableName: 'boughtbreeds'
},
{
    attributes: {
        boughtBreedId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'boughtBreedId'
        },
        boughtBreedUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'boughtBreedUUId'
        },
        userId: {
            type: Sequelize.BIGINT(20),
            field: 'userId'
        },
        boughtBreedName: {
            type: Sequelize.STRING(50),
            field: 'boughtBreedName'
        }
    },
    options: {
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
