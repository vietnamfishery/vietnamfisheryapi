import * as bcryptjs from 'bcryptjs';
import { Promise } from './promise';

export class Enscrypts {
    public static getSalt(rounds: number): Promise<string> {
        return Promise.resolve(bcryptjs.genSalt(rounds));
    }

    public static getSaltSync(rounds: number) {
        return bcryptjs.genSaltSync(rounds);
    }

    public static hashing(text: string, salt: number | string): Promise<string> {
        return Promise.resolve(bcryptjs.hash(text, salt));
    }

    public static hashingSync(text: string, salt: number | string): string {
        return bcryptjs.hashSync(text, salt);
    }

    public static compare(candidate: string, hash: string): Promise<boolean> {
        return Promise.resolve(bcryptjs.compare(candidate, hash));
    }

    public static compareSync(candidate: string, hash: string): boolean {
        return bcryptjs.compareSync(candidate, hash);
    }

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
