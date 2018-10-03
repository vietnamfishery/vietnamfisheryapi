import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const boughtbreeddetailsOptions: any = _.merge({
    tableName: 'boughtbreeddetails'
},
{
    attributes: {
        boughtBreedDetailUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            field: 'boughtBreedDetailUUId'
        },
        boughtBreedId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'boughtBreedId'
        },
        breedId: {
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            field: 'breedId'
        },
        quantity: {
            type: Sequelize.FLOAT,
            field: 'quantity'
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            field: 'unitPrice'
        },
        soldAddress: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'soldAddress'
        }
    },
    options: {
        createdBy: false,
        createdDate: false,
        updatedBy: false,
        updatedDate: false
    }
}, _.cloneDeep(baseModel));
