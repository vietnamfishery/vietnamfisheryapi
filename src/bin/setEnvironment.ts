import * as path from 'path';
import * as dotenv from 'dotenv';
export default function setEnvironment() {
    if (process.env.NODE_ENV.trim() === 'debug') {
        dotenv.config({
            path: process.cwd() + '/debug.env'
        });
    }
    else if (process.env.NODE_ENV.trim() === 'development') {
        dotenv.config({
            path: process.cwd() + '/.env'
        });
    } else if (process.env.NODE_ENV.trim() === 'production') {
        dotenv.config({
            path: process.cwd() + '/production.env'
        });
    }
}
