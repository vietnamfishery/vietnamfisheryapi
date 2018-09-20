import * as bcryptjs from 'bcryptjs';
import { Promise } from './Promise';

export class Enscrypt {
    public static getSalt(): Promise<string> {
        return Promise.resolve(bcryptjs.genSalt(22));
    }
}