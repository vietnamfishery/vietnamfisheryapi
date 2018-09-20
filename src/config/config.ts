import { Dialect, ISequelizeConfig } from '../structure';
import { Options, PoolOptions, ReplicationOptions } from 'sequelize';

enum environment {
    development = 'development',
    production = 'production'
}

const env = process.env.NODE_ENV || environment.development;
const isProd = env === environment.production;

export const databaseName = 'fisheriesdatabase';
export const port = env === environment.development ? 3000 : 7979;

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
