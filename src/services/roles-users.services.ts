import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { rolesusersOptions } from '../models/objects';

export class RolesUsersServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: rolesusersOptions.tableName,
            model: rolesusersOptions.attributes,
            deleteMode: rolesusersOptions.options
        }
    ) {
        super(optionsModel);
    }
}
