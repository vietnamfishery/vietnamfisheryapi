import { NextFunction, Request, Response } from 'express';
import * as Sequelize from 'sequelize';
import { userModel } from '../../models';
import { User } from './users';

export class Signin {
    constructor(){}
    public static addUser(user: User): void {
        console.log(user);
        // this.sequelize.define('users', userModel).create(user);
    }
}