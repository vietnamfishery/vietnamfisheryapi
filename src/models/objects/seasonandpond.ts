import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export const seasonAndPondOptions: any = _.merge({
    tableName: 'seasonsandpond'
},
{
    attributes: {
        seasonAndPondId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true
        },
        pondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true
        }
    },
    options: {
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        hooks: {},
        tableName: 'seasonsandpond'
    }
});
