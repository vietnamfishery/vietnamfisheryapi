import * as fs from 'fs';
import * as winston from 'winston';

const PATHS = {
  LOG: `${process.cwd()}/logs`,
  LOG_ERROR: `${process.cwd()}/logs/_error.log`,
  LOG_INFO: `${process.cwd()}/logs/_info.log`,
};
// ensure log directory exists
(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();

export const logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      colorize: false,
      filename: PATHS.LOG_INFO,
      handleExceptions: true,
      json: true,
      level: 'info',
      maxFiles: 2,
      maxsize: 5242880, // 5MB
      name: 'info',
    }),
    new (winston.transports.File)({
      colorize: false,
      filename: PATHS.LOG_ERROR,
      handleExceptions: true,
      json: true,
      level: 'error',
      maxFiles: 2,
      maxsize: 5242880, // 5MB
      name: 'error',
    }),
    new winston.transports.Console({
      colorize: true,
      handleExceptions: true,
      json: false,
      level: 'debug',
      name: 'debug',
    }),
  ],
});
