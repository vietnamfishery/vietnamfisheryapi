import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userOptions } from '../models/objects';
import { Promise } from '../lib';
import DBHelper from '../helpers/db-helpers';
import { Sequelize, Transaction } from 'sequelize';
import { UserRoles } from '../components/userRoles';

export class UserServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB
    ) {
        super(optionsModel);
        this.models = this.conn.usersModel;
    }
    public register(entity: any): Promise<any> {
        const sequeliz: Sequelize = DBHelper.sequelize;
        return sequeliz.transaction({autocommit: true},(t: Transaction) => {
            return this.models.create(entity.user);
        }).then((user) => {
            const userRoles: UserRoles = new UserRoles(user.userId, entity.roles);
            return userRoles.userRolesServices.models.create(userRoles);
        });
    }

    public getUserByUsername(userQuery: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.findOne(userQuery).then((user: any) => {
                if(user) {
                    resolve(user.dataValues);
                } else {
                    resolve(user);
                }
            });
        });
    }

    public registerChild(entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.create(entity).then((user) => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
