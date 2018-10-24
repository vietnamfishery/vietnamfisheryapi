import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export const districtOptions: any = _.merge({
    tableName: 'district'
},
{
    attributes: {
        districtid: {
            type: Sequelize.STRING(5),
            primaryKey: true,
            // field: 'districtid'
        },
        name: {
            type: Sequelize.STRING(100),
            // field: 'name'
        },
        type: {
            type: Sequelize.STRING(30),
            // field: 'type'
        },
        location: {
            type: Sequelize.STRING(30),
            // field: 'location'
        },
        provinceid: {
            type: Sequelize.STRING(5),
            allowNull: false,
            // field: 'provinceid'
        }
    },
    options: {
        tableName: 'district',
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        defaultScope: {},
        scopes: {}
    }
});
