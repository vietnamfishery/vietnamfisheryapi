import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondenvironmentsOptions } from '../models';

export class PondEnvironmentsServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: pondenvironmentsOptions.tableName,
            model: pondenvironmentsOptions.attributes,
            deleteMode: pondenvironmentsOptions.options
        }
    ) {
        super(optionsModel);
    }
}
