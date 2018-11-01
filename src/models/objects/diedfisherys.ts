import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const diedfisherysOptions: any = _.merge({
    tableName: 'diedfisherys'
},
{
    attributes: {
        diedFisheryId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'diedFisheryId'
        },
        diedFisheryUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'diedFisheryUUId'
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'seasonAndPondId'
        },
        card: {
            type: Sequelize.INTEGER(1),
            // field: 'card'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        solutions: {
            type: Sequelize.TEXT,
            allowNull: true,
            // field: 'solutions'
        },
        employee: {
            type: Sequelize.STRING(50),
            allowNull: true,
            // field: 'employee'
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
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'diedfisherys'
    }
}, _.cloneDeep(baseModel));
