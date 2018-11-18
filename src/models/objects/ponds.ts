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
            primaryKey: true
        },
        pondUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        pondName: {
            type: Sequelize.STRING(50)
        },
        pondArea: {
            type: Sequelize.FLOAT
        },
        pondDepth: {
            type: Sequelize.FLOAT
        },
        createCost: {
            type: Sequelize.FLOAT
        },
        pondCreatedDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        isFed: {
            type: Sequelize.INTEGER(1),
            allowNull: true
        },
        isDiary: {
            type: Sequelize.INTEGER(1),
            allowNull: true
        },
        images: {
            type: Sequelize.TEXT({ length: '1000' }),
            allowNull: true
        },
        pondLatitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: () => {
                return null;
            }
        },
        pondLongitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: () => {
                return null;
            }
        },
        createdBy: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            }
        },
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            }
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'ponds'
    }
}, _.cloneDeep(baseModel));
