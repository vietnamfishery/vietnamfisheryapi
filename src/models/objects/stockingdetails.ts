import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const stockingdetailOptions: any = _.merge({
    tableName: 'stockingdetails'
},
{
    attributes: {
        stockingDetailUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
        },
        breedId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        stockingId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        stockingQuantity: {
            type: Sequelize.BIGINT(20),
        },
        phFirst: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        salinityFirst: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'stockingdetails'
    }
}, _.cloneDeep(baseModel));
