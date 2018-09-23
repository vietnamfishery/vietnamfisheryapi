import { authdb, Dialect, environment, pool } from '../common';
import { Options, ReplicationOptions } from 'sequelize';
/**
 * Config port
 */
const env = process.env.NODE_ENV || environment.development;

export const port = env === environment.development ? 3000 : 7979;

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
