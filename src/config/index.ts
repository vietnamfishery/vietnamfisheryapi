import { Options, PoolOptions, ReplicationOptions } from 'sequelize';
import * as moment from 'moment-timezone';
import * as os from 'os';
import { find } from 'lodash';

export enum environment {
    development = 'development',
    production = 'production'
}

export enum Dialect {
    mysql = 'mysql',
    sqlite = 'sqlite',
    postgres = 'postgres',
    mssql = 'mssql'
}

export interface ISequelizeConfig {
    dialect?: Dialect;
    operatorsAliases?: boolean;
    pool?: PoolOptions;
    replication?: ReplicationOptions;
}

const env = process.env.NODE_ENV.trim() || environment.development;
const isProd = env === 'production';

const reg: RegExp = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

const wifi: any = find(os.networkInterfaces()[`Wi-Fi`], e => reg.test(e.address.toString())) || {};

export const host: string = wifi.address || os.hostname() || 'localhost';

export const databaseName = 'fisheriesdatabase';

/**
 * @var PORT from evironment - config in cli run start project
 * @var DEVELOPMENT from evironment - port config with development stage, value: 7979
 * @var PRODUCTION from evironment - port config with production stage, value: 9999
 */
export const port = process.env.PORT || env === environment.development ? 7979 : 9999;

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

const timezone: string = moment().utc().format('Z');
export const configDB: Options = {
    dialect: Dialect.mysql,
    operatorsAliases: false,
    pool,
    port: 3306,
    replication,
    timezone,
};

export const config: Options = {
    dialect: Dialect.mysql,
    operatorsAliases: false,
    pool,
    replication
};

/**
 * color of console.log
 */
export enum colorCli {
    RESET = '\x1b[0m',
    BRIGHT = '\x1b[1m',
    DIM = '\x1b[2m',
    UNDERSCORE = '\x1b[4m',
    BLINK = '\x1b[5m',
    REVERSE = '\x1b[7m',
    HIDDEN = '\x1b[8m',
    BLACK = '\x1b[30m',
    RED = '\x1b[31m',
    GREEN = '\x1b[32m',
    YELLOW = '\x1b[33m',
    BLUE = '\x1b[34m',
    MAGENTA = '\x1b[35m',
    CYAN = '\x1b[36m', // xanh biển
    WHITE = '\x1b[37m',
    CRIMSON = '\x1b[38m', // not working
    BG_BLACK = '\x1b[40m',
    BG_RED = '\x1b[41m',
    BG_GREEN = '\x1b[42m',
    BG_YELLOW = '\x1b[43m',
    BG_BLUE = '\x1b[44m',
    BG_MAGENTA = '\x1b[45m',
    BG_CYAN = '\x1b[46m',
    BG_WHITE = '\x1b[47m',
    BG_CRIMSON = '\x1b[48m', // not working
    // color 256
    /**
     * ```js
     *  for(let i = 0; i < 16; i++) {
     *      for(let j = 0; j < 16; j++) {
     *          const code = (i * 16 + j);
     *          console.log(colorCli.TEMPLATE + code + 'm', code + '\t');
     *      }
     *  }
     * ```
     */
    TEMPLATE = '\u001b[38;5;',
}

export const rootEndpoint = '/api';

export enum APIVersion {
    v1 = '/api/v1'
}

/**
 * Method of http
 */
export enum method {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE'
}
