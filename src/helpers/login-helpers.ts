import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { find } from 'lodash';

export class Authentication {
    static cert: Buffer = readFileSync(process.cwd() + '/authKey/jwtRS256.key.pub');
    constructor() {}
    static isLogin(request: Request, response: Response, next: NextFunction) {
        const token: string = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null;
        if(!token) {
            response.status(200).json({
                success: false,
                message: 'Dừng lại, truy cập là không được phép!'
            });
        } else {
            jwt.verify(token, Authentication.cert, {
                algorithms: ['RS512', 'RS256']
            }, (err, data) => {
                if(err) {
                    response.status(200).json({
                        success: false,
                        message: 'Bạn cần đăng nhập để tiếp tục.'
                    });
                } else {
                    next();
                }
            });
        }
    }

    static isBoss(request: Request, response: Response, next: NextFunction) {
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        if(!isBoss) {
            response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập.'
            });
        } else {
            next();
        }
    }

    static isPondRole(request: Request, response: Response, next: NextFunction) {
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const isPondRole: boolean = !!find(deToken.roles, e => e.roles === 1) || !deToken.roles.length;
        if(isPondRole || isBoss) {
            next();
        } else {
            return response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập.'
            });
        }
    }

    static isStorageRole(request: Request, response: Response, next: NextFunction) {
        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        const isStorageRole: boolean = !!find(deToken.roles, e => e.roles === 2) || !deToken.roles.length;
        if(isBoss && isStorageRole) {
            next();
        } else {
            return response.status(200).json({
                success: false,
                message: 'Bạn không có quyền truy cập.'
            });
        }
    }

    static detoken(token: string) {
        return jwt.decode(token,{json: true});
    }
}
/**
 * Phần authen có thể dùng cho MEAN Stack
 */
// import * as passport from 'passport';
// import * as localStrategy from 'passport-local';
// const LocalStrategy = localStrategy.Strategy;
// import * as jwtStrategy from 'passport-jwt';
// const JwtStrategy = jwtStrategy.Strategy;
// const ExtractJwt = jwtStrategy.ExtractJwt;
// import { UserServives } from '../services';
// import * as constants from '../common';
// import { User } from '../components/users';

// export class LoginHelper {
//     private userServices: UserServives = new UserServives();
//     public static token: string;
//     constructor() {
//         this.usingPassport();
//         this.serializeUser();
//         this.deserializeUser();
//     }

//     private usingPassport(): void {
//         const opts: any = {};
//         opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//         opts.secretOrKey = constants.secret;
//         passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
//             this.userServices.getUserByUsername(this.getQuery({username: jwtPayload.username})).then(user => {
//                 done(null, user);
//             }).catch(err => {
//                 if(err) {
//                     return done(err, false);
//                 }
//                 done(null, false);
//             });
//         }));
//         /*
//         passport.use(new LocalStrategy((username, password, done) => {
//             this.userServices.getUserByUsername(this.getQuery({username})).then((result: any) => {
//                 Enscrypts.compare(password, result.password).then((isMatch: boolean) => {
//                     console.log(isMatch);
//                     if(typeof isMatch === typeof Error) {
//                         throw isMatch;
//                     }
//                     else if (isMatch) {
//                         TokenHelper.sign(result.username)
//                         .then((token) => {
//                             LoginHelper.token = token;
//                             return done(null, result);
//                         });
//                     }
//                     else {
//                         return done(null, false);
//                     }
//                 });
//             }).catch(() => {
//                 return done(null, false);
//             });
//         }));
//         */
//     }

//     private serializeUser(): void {
//         passport.serializeUser((user: User, done: any) => {
//             done(null, user);
//         });
//     }

//     private deserializeUser(): void {
//         passport.deserializeUser((user: User, done: any) => {
//             this.userServices.getUserByUsername(this.getQuery({username: user.username})).then((result: User) => {
//                 return done(null, result);
//             }).catch(() => {
//                 return done(null, false);
//             });
//         });
//     }

//     private getQuery(where: any): any {
//         return {
//             where
//         };
//     }

//     public static isLoggedIn(req: Request, res: Response, next: NextFunction) {
//         if (req.isAuthenticated()) {
//             res.cookie('vietnamfishery', LoginHelper.token, {
//                 maxAge: 365 * 24 * 60 * 60 * 1000
//             });
//             return next();
//         }
//         res.redirect('/api/user/login/failure');
//     }

//     public static notLoggedIn(req: Request, res: Response, next: NextFunction) {
//         if (!req.isAuthenticated()) {
//             return next();
//         }
//         res.redirect('/api/user/login');
//     }

//     // public authenticate(successRedirect: string, failureRedirect: string): any {
//     //     return passport.authenticate('local', {
//     //         successRedirect,
//     //         failureRedirect
//     //     });
//     // }
// }
