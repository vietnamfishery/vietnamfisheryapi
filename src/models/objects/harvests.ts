import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const harvestOptions: any = _.merge({
    tableName: 'harvests'
},
{
    attributes: {
        harvestId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true
        },
        harvestUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        harvestName: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            }
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
        }
    },
    options: {
        tableName: 'harvests'
    }
}, _.cloneDeep(baseModel));
