import * as Sequelize from 'sequelize';
import * as _ from 'lodash';

export const seasonandpondOptions: any = _.merge({
    tableName: 'seasonandpond'
},
{
    attributes: {
        seasonAndPondId: {
            autoIncrement: true,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            // field: 'seasonAndPondId'
        },
        seasonId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
            // field: 'seasonId'
        },
        pondId: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique: true,
            // field: 'pondId'
        }
    },
    options: {
        //
    }
});
