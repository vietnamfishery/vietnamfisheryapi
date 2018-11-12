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
        },
        breedUUId: {
            type: Sequelize.STRING(36),
            unique: true,
            allowNull: false,
        },
        ownerId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        breedName: {
            type: Sequelize.STRING(80),
        },
        totalQuantity: {
            type: Sequelize.BIGINT(20),
        },
        unit: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        loopOfBreed: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        tips: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
        }
    },
    options: {
        tableName: 'breeds'
    }
}, _.cloneDeep(baseModel));
