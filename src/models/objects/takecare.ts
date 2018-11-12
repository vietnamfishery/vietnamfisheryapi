import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const takecareOptions: any = _.merge({
    tableName: 'takecare'
},
{
    attributes: {
        takeCareId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true
        },
        takeCareUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        takeType: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        takeCareName: {
            type: Sequelize.STRING(100),
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
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'takecare'
    }
}, _.cloneDeep(baseModel));
