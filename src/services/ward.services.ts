import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { wardOptions } from '../models';

export class WardServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: wardOptions.tableName,
            model: wardOptions.attributes,
            deleteMode: wardOptions.options
        }
    ) {
        super(optionsModel);
    }
}
