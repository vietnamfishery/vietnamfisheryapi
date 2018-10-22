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
            primaryKey: true,
            field: 'takeCareId'
        },
        takeCareUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'takeCareUUId'
        },
        seasonAndPondId: {
            type: Sequelize.BIGINT(20),
            field: 'seasonAndPondId'
        },
        takeCareName: {
            type: Sequelize.STRING(100),
            field: 'takeCareName'
        },
        takeType: {
            type: Sequelize.INTEGER(1),
            field: 'takeType'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
