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
            primaryKey: true
        },
        usingVeterinaryUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true
        },
        takeCareId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        storageId: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        causesNSymptoms: {
            type: Sequelize.STRING
        },
        averageSize: {
            type: Sequelize.FLOAT
        },
        totalBiomass: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.FLOAT
        },
        result: {
            type: Sequelize.STRING(100),
        },
        latestHarvestDate: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        mentor: {
            type: Sequelize.STRING(50),
            allowNull: true
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
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'usingveterinary'
    }
}, _.cloneDeep(baseModel));
