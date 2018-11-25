import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const boughtbreeddetailsOptions: any = _.merge({
    tableName: 'boughtbreeddetails'
},
{
    attributes: {
        boughtBreedDetailId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        boughtBreedDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        couponId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        breedId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        quantity: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        unit: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        unitPrice: {
            allowNull: false,
            type: Sequelize.FLOAT,
            // field: 'unitPrice'
        },
        soldAddress: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        testingAgency: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        descriptions: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true,
        }
    },
    options: {
        tableName: 'boughtbreeddetails'
    }
}, _.cloneDeep(baseModel));
