import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const breedOptions: any = _.merge({
    tableName: 'breeds'
},
{
    attributes: {
        breedId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'breedId'
        },
        breedUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
            // field: 'breedUUId'
        },
        ownerId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        breedName: {
            type: Sequelize.STRING(80),
            // field: 'breedName'
        },
        totalQuantity: {
            type: Sequelize.BIGINT(20),
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
            allowNull: true,
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        tableName: 'breeds'
    }
}, _.cloneDeep(baseModel));
