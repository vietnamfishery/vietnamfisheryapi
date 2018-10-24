import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';
import * as _ from 'lodash';
import { baseModel } from './base.model';

export const userOptions: any = _.merge({
    tableName: 'users'
},
{
    attributes: {
        userId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'userId'
        },
        userUUId: {
            type: Sequelize.STRING(36),
            allowNull: false,
            unique: true,
            // field: 'userUUId'
        },
        firstname: {
            type: Sequelize.STRING(50),
            // field: 'firstname'
        },
        lastname: {
            type: Sequelize.STRING(50),
            // field: 'lastname'
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: true,
            // field: 'birthday'
        },
        addressContact: {
            type: Sequelize.STRING,
            allowNull: true,
            // field: 'addressContact'
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            // field: 'username'
        },
        password: {
            type: Sequelize.STRING(100),
            // field: 'password'
        },
        town: {
            type: Sequelize.STRING(50),
            allowNull: true,
            // field: 'town'
        },
        district: {
            type: Sequelize.STRING(50),
            allowNull: true,
            // field: 'district'
        },
        province: {
            type: Sequelize.STRING(5),
            allowNull: true,
            // field: 'province'
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            // field: 'status'
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true,
            // field: 'phone'
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            // field: 'email'
        },
        images: {
            type: Sequelize.TEXT({ length: '1000' }),
            allowNull: true,
            // field: 'images'
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
        updatedBy: {
            type: Sequelize.STRING(36),
            allowNull: true,
            // field: 'updatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            // field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            // field: 'isDeleted'
        }
    },
    options: {
        // something with disable fields
    }
}, _.cloneDeep(baseModel));
