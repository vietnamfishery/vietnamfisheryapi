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

export enum actionServices {
    ADD = 'insert',
    EDIT = 'update',
}

export enum actionUserServices {
    REGISTER = 'register',
    ADD_CHILD = 'register-empployees',
    LOGIN = 'login',
    UPDATE = 'update',
    DELETE = 'delete'
}

export enum modelName {
    USER = 'users',
    POND = 'ponds'
}

export const secret = 'vietnamfisherysecret';

export enum folderDrive {
    uploadImageVNF = '1zh74DklADISZbcEYVix2nDDKd5wtt0-Z'
}
