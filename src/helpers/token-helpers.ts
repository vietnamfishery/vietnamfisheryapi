import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export class TokenHelper {
    constructor() {}

    public static sign(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.sign(data, 'vnfsecrectkey', (err: Error, token) => {
                if(err) {
                    reject(err);
                }
                else if (token) {
                    resolve(token);
                }
            });
        });
    }

    /**
     * [Format of token] Authorization: vnFishery%<access_token>
     * @param req
     * @param res
     * @param next
     */
    public static vertifyToken(req: Request, res: Response, next: NextFunction) {
        const vnfHeader = req.headers[`authorization`];

        if(typeof vnfHeader !== `undefined`) {
            const vnFishery: Array<{}> = vnfHeader.split('%');
            req[`token`] = vnFishery[1];
            next();
        }
        else {
            res.sendStatus(403);
        }
    }

    public static decodeToken(token: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token,key, (err: Error, authData: any) => {
                if(err) {
                    reject(err);
                }
                else if(authData) {
                    resolve(authData);
                }
            });
        });
    }
}
