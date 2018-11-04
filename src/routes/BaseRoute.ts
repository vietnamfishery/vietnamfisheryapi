import { Router } from 'express';

export abstract class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    public static path = '/api';
    protected router = Router();

    constructor () {}

    /**
     * Enscrypts.hashingSync('vietnamfishery', Enscrypts.getSaltSync(Math.floor((Math.random() * 12) + 1))) + '100%<3' +
     */
    protected reCryptToken = (tokenBCrypt: string, isBoss: boolean): string => {
        const token = tokenBCrypt.split('.');
        if(!isBoss) {
            return token[0] + '.' + (token[1].slice(0, token[1].length-1) + Math.floor((Math.random() * 9) + 1) + token[1][token[1].length - 1]) + '.' + token[2];
        } else {
            return token[0] + '.' + (token[1].slice(0, token[1].length-1) + 0 + token[1][token[1].length - 1]) + '.' + token[2];
        }
    }

    protected extractToken = (token: string): string => {
        const tokenCheck = token.split('.');
        return tokenCheck[0] + '.' + (tokenCheck[1].slice(0, tokenCheck[1].length-1) + tokenCheck[1][tokenCheck[1].length]) + '.' + tokenCheck[2];
    }
}
