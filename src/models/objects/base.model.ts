import * as Sequelize from 'sequelize';
import { DateUtil } from '../../lib';

export const baseModel: any = {
    options: {
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        defaultScope: {
            where: {
                isDeleted: 0
            }
        },
        scopes: {
            deletedRecord: {
                where: {
                    isDeleted: 1
                }
            }
        },
        hooks: {}
    }
};
