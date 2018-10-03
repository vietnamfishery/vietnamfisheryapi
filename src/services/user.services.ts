import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userOptions } from '../models/objects';
import { Promise } from '../lib';
import { User } from '../components/users/users';

export class UserServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: userOptions.tableName,
            model: userOptions.attributes,
            deleteMode: userOptions.options
        }
    ) {
        super(optionsModel);
        this.models = this.conn.usersModel;
    }
    public register(entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.create(entity).then((user) => {
                resolve(user);
            });
        });
    }

    public getUserByUsername(userQuery: any): Promise<User> {
        return new Promise((resolve, reject) => {
            this.models.findOne(userQuery).then((user: User) => {
                resolve(user);
            });
        });
    }
}
