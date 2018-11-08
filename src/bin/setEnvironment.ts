import * as path from 'path';
import * as dotenv from 'dotenv';
export default function setEnvironment() {
    if (process.env.NODE_ENV.trim() === 'debug') {
        dotenv.config({
            path: path.join(__dirname, '../../debug.env')
        });
    }
    else if (process.env.NODE_ENV.trim() === 'development') {
        dotenv.config({
            path: path.join(__dirname, '../../.env')
        });
    } else if (process.env.NODE_ENV.trim() === 'production') {
        dotenv.config({
            path: path.join(__dirname, '../../production.env')
        });
    }
}
