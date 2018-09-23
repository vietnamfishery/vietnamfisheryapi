import { PoolOptions } from 'sequelize';

export const IdDataTypes: any = {
    Integer: 'Integer',
    UuidV1: 'UuidV1',
    UuidV4: 'UuidV4',
};

export enum Dialect {
    mysql = 'mysql',
    sqlite = 'sqlite',
    postgres = 'postgres',
    mssql = 'mssql'
}

export const databaseName: string = 'fisheriesdatabase';

export enum environment {
    development = 'development',
    production = 'production'
}

export const pool: PoolOptions = {
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
