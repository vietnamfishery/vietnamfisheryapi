import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const usingveterinaryOptions: any = _.merge({
    tableName: 'usingveterinary'
},
{
    attributes: {
        usingVeterinaryId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'usingVeterinaryId'
        },
        usingVeterinaryUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
            // field: 'usingVeterinaryUUId'
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'takeCareId'
        },
        materialId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'materialId'
        },
        causesNSymptoms: {
            type: Sequelize.STRING,
            // field: 'causesNSymptoms'
        },
        averageSize: {
            type: Sequelize.FLOAT,
            // field: 'averageSize'
        },
        totalBiomass: {
            type: Sequelize.FLOAT,
            // field: 'totalBiomass'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        result: {
            type: Sequelize.STRING(100),
            // field: 'result'
        },
        latestHarvestDate: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            // field: 'latestHarvestDate'
        },
        mentor: {
            type: Sequelize.STRING(50),
            allowNull: true,
            // field: 'mentor'
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
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
            // field: 'isDeleted'
        }
    },
    options: {
        //
    }
}, _.cloneDeep(baseModel));
