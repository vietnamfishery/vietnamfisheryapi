import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';

export class UserRolesServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB) {
        super(optionsModel);
        this.models = this.conn.userRolesModel;
    }
}
