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
            // field: 'boughtBreedDetailId'
        },
        boughtBreedDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'boughtBreedDetailUUId'
        },
        boughtBreedId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'boughtBreedId'
        },
        breedId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            // field: 'breedId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            // field: 'quantity'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            // field: 'unitPrice'
        },
        soldAddress: {
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'soldAddress'
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'notes'
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
