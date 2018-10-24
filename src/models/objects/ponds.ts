import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const pondOptions: any = _.merge({
    tableName: 'ponds'
},
{
    attributes: {
        pondId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'pondId'
        },
        pondUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'pondUUId'
        },
        pondName: {
            type: Sequelize.STRING(50),
            // field: 'pondName'
        },
        pondArea: {
            type: Sequelize.FLOAT,
            // field: 'pondArea'
        },
        pondDepth: {
            type: Sequelize.FLOAT,
            // field: 'pondDepth'
        },
        createCost: {
            type: Sequelize.FLOAT,
            // field: 'createCost'
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            // field: 'status'
        },
        images: {
            type: Sequelize.TEXT({ length: '1000' }),
            allowNull: true,
            // field: 'images'
        },
        pondLatitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            // field: 'pondLatitude'
        },
        pondLongitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            // field: 'pondLongitude'
        },
        pondCreatedDate: {
            type: Sequelize.DATE,
            // field: 'pondCreatedDate'
        },
        createdBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
            // field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'createdDate'
        },
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
            // field: 'updatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
