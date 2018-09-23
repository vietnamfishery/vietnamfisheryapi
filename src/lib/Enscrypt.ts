import * as bcryptjs from 'bcryptjs';
import { Promise } from './promise';

export class Enscrypt {
    public static getSalt(rounds: number): Promise<string> {
        return Promise.resolve(bcryptjs.genSalt(rounds));
    }

    public static hashing(text: string, salt: number | string): Promise<string> {
        return Promise.resolve(bcryptjs.hash(text, salt));
    }

    public static compare(candidate: string, hash: string): Promise<boolean> {
        return Promise.resolve(bcryptjs.compare(candidate, hash));
    }
}
