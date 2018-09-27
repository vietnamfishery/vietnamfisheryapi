import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { storagesOptions } from '../models';

export class StoregeServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: storagesOptions.tableName,
            model: storagesOptions.attributes,
            deleteMode: storagesOptions.options
        }
    ) {
        super(optionsModel);
    }
}
