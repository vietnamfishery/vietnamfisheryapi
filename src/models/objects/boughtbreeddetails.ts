import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
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
            // field: 'boughtBreedDetailUUId'
        },
        boughtBreedId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'boughtBreedId'
        },
        breedId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        quantity: {
            type: Sequelize.FLOAT,
            allowNull: false,
            // field: 'quantity'
        },
        unit: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false,
            // field: 'unitPrice'
        },
        loopOfBreed: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            // field: 'loopOfBreed'
        },
        soldAddress: {
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'soldAddress'
        },
        testingAgency: {
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'testingAgency'
        },
        descriptions: {
            type: Sequelize.TEXT,
            allowNull: true,
            // field: 'descriptions'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true,
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'boughtbreeddetails'
    }
}, _.cloneDeep(baseModel));
