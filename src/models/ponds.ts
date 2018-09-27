import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';
import * as _ from 'lodash';
import { baseModel } from './base-model';

export const pondOptions: any = _.merge({
    tableName: 'users'
},
{
    attributes: {
        pondId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'pondId'
        },
        pondUUId: {
            type: Sequelize.STRING(36),
            field: 'pondUUId'
        },
        pondName: {
            type: Sequelize.STRING(50),
            field: 'pondName'
        },
        pondArea: {
            type: Sequelize.FLOAT,
            field: 'pondArea'
        },
        pondDepth: {
            type: Sequelize.FLOAT,
            field: 'pondDepth'
        },
        createCost: {
            type: Sequelize.FLOAT,
            field: 'createCost'
        },
        status: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: 0,
            field: 'status'
        },
        images: {
            type: Sequelize.TEXT({ length: '1000' }),
            allowNull: true,
            field: 'images'
        },
        pondLatitude: {
            type: Sequelize.FLOAT,
            field: 'pondLatitude'
        },
        pondLongitude: {
            type: Sequelize.FLOAT,
            field: 'pondLongitude'
        },
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
