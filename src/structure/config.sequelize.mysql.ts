import { PoolOptions, ReplicationOptions } from 'sequelize';

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
