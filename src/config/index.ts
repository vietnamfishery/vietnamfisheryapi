import { Dialect, ISequelizeConfig } from '../structure';
import { Options, PoolOptions, ReplicationOptions } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

export const databaseName = 'fisheryDatabase';
export const port = 3000;

const pool: PoolOptions = {
    acquire: 30000,
    idle: 10000,
    max: 5,
    min: 0
};

export const authdb: any = {
    host: 'localhost',
    password: 'J%:dTva*#9c>k@L6',
    username: 'fisherier'
};

const replication: ReplicationOptions = {
    read: authdb,
    write: authdb
};

export const config: Options = {
    dialect: Dialect.mysql,
    operatorsAliases: false,
    pool,
    replication
};
