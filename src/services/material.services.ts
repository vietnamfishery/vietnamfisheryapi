import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { materialOptions } from '../models';

export class MaterialServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: materialOptions.tableName,
            model: materialOptions.attributes,
            deleteMode: materialOptions.options
        }
    ) {
        super(optionsModel);
    }
}
