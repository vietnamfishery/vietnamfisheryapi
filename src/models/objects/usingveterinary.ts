import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const usingveterinaryOptions: any = _.merge({
    tableName: 'usingveterinary'
},
{
    attributes: {
        usingVeterinaryUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'usingVeterinaryUUId'
        },
        materialId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'materialId'
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            unique: true,
            field: 'takeCareId'
        },
        causesNSymptoms: {
            type: Sequelize.STRING,
            field: 'causesNSymptoms'
        },
        averageSize: {
            type: Sequelize.FLOAT,
            field: 'averageSize'
        },
        totalBiomass: {
            type: Sequelize.FLOAT,
            field: 'totalBiomass'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        result: {
            type: Sequelize.STRING(100),
            field: 'result'
        },
        latestHarvestDate: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            field: 'latestHarvestDate'
        },
        mentor: {
            type: Sequelize.STRING(50),
            allowNull: true,
            field: 'mentor'
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'createdBy'
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
