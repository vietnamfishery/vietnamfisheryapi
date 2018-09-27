import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { costsOptions } from '../models';

export class CostsServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: costsOptions.tableName,
            model: costsOptions.attributes,
            deleteMode: costsOptions.options
        }
    ) {
        super(optionsModel);
    }
}
