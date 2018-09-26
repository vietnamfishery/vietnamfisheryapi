import * as passport from 'passport';
import * as localStrategy from 'passport-local';
const LocalStrategy = localStrategy.Strategy;
import { UserServives } from '../services';
import { User } from '../components/users/users';
import { Enscrypt } from '../lib';
import { NextFunction, Request, Response } from 'express';
import { TokenHelper } from './token-helpers';

export class LoginHelper {
    private userServices: UserServives = new UserServives();
    public static token: string;
    constructor() {
        this.usingPassport();
        this.serializeUser();
        this.deserializeUser();
    }

    private usingPassport(): void {
        passport.use(new LocalStrategy((username, password, done) => {
            this.userServices.getUserByUsername(this.getQuery({username})).then((result: any) => {
                Enscrypt.compare(password, result.password).then((isMatch: boolean) => {
                    if(typeof isMatch === typeof Error) {
                        throw isMatch;
                    }
                    else if (isMatch) {
                        TokenHelper.sign(result.username)
                        .then((token) => {
                            LoginHelper.token = token;
                            return done(null, result);
                        });
                    }
                    else {
                        return done(null, false);
                    }
                });
            }).catch(() => {
                return done(null, false);
            });
        }));
    }

    private serializeUser(): void {
        passport.serializeUser((user: User, done: any) => {
            done(null, user);
        });
    }

    private deserializeUser(): void {
        passport.deserializeUser((user: User, done: any) => {
            this.userServices.getUserByUsername(this.getQuery({username: user.username})).then((result: User) => {
                return done(null, result);
            }).catch(() => {
                return done(null, false);
            });
        });
    }

    private getQuery(where: any): any {
        return {
            where
        };
    }

    public static isLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            res.cookie('vietnamfishery', LoginHelper.token, {
                maxAge: 365 * 24 * 60 * 60 * 1000
            });
            return next();
        }
        res.redirect('/api/user/login');
    }

    public static notLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('user/login');
    }

    public authenticate(successRedirect: string, failureRedirect: string): any {
        return passport.authenticate('local', {
            successRedirect,
            failureRedirect
        });
    }
}
