import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const ownerBreedOptions: any = _.merge({
    tableName: 'ownerbreed'
},
{
    attributes: {
        ownerId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        userId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            allowNull: true
        }
    },
    options: {
        tableName: 'ownerbreed'
    }
}, _.cloneDeep(baseModel));
