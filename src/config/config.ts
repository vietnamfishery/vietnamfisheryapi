import { authdb, Dialect, environment, pool } from '../common';
import { Options, ReplicationOptions } from 'sequelize';
/**
 * Config port
 */
const env = process.env.NODE_ENV.trim() || environment.development;

export const port = env === environment.development ? 7979 : 9999;

/**
 * Config database
 */
const replication: ReplicationOptions = {
    read: authdb,
    write: authdb
};

export const configDB: Options = {
    dialect: Dialect.mysql,
    operatorsAliases: false,
    pool,
    replication
};
