import * as Sequelize from 'sequelize';
import * as config from '../config';

const sequelize = new Sequelize(config.databaseName, null, null, config.config);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
