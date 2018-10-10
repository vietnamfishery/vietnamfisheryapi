import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { ponduserrolesOptions } from '../models/objects';

export class PondUserRolesServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB
    ) {
        super(optionsModel);
        this.models = this.conn.ponduserrolesModel;
    }
}
