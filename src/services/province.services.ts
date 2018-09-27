import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { provinceOptions } from '../models';

export class ProvinceServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: provinceOptions.tableName,
            model: provinceOptions.attributes,
            deleteMode: provinceOptions.options
        }
    ) {
        super(optionsModel);
    }
}
