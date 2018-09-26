import * as Sequelize from 'sequelize';
import { DateUtil } from '../lib';

export const baseModel: any = {
    attributes: {
        createdBy: {
            type: Sequelize.STRING,
            field: 'CreatedBy'
        },
        createdDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'CreatedDate'
        },
        updatedBy: {
            type: Sequelize.STRING,
            field: 'UpdatedBy'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: () => {
                return DateUtil.getUTCDateTime();
            },
            field: 'UpdatedDate'
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'IsDeleted'
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
