import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userrolesOptions } from '../models/objects';

export class UserRolesServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = userrolesOptions;
    constructor() {
        super(UserRolesServices.optionsModel);
        this.models = this.conn.userRolesModel;
    }
}
