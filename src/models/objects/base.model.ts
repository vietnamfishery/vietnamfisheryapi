import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';

export const baseModel: any = {
    attributes: {
        createdBy: {
            type: Sequelize.STRING,
            field: 'createdBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'createdDate'
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'updatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'updatedDate'
        },
        isDeleted: {
            type: Sequelize.INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            field: 'isDeleted'
        }
    },

    options: {
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        defaultScope: {
            where: {
                isDeleted: false
            }
        },
        scopes: {
            deletedRecord: {
                where: {
                    isDeleted: true
                }
            }
        },
        hooks: {}
    }
};
