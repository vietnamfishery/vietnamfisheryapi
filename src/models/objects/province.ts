import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export const provinceOptions: any = _.merge({
    tableName: 'province'
},
{
    attributes: {
        provinceid: {
            type: Sequelize.STRING(5),
            primaryKey: true,
            field: 'provinceid'
        },
        name: {
            type: Sequelize.STRING(100),
            field: 'name'
        },
        type: {
            type: Sequelize.STRING(30),
            field: 'type'
        }
    },
    options: {
        tableName: 'province',
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        defaultScope: {},
        scopes: {}
    }
});
