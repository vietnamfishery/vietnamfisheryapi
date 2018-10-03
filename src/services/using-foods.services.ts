import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { usingfoodOptions } from '../models/objects';

export class UsingFoodsServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: usingfoodOptions.tableName,
            model: usingfoodOptions.attributes,
            deleteMode: usingfoodOptions.options
        }
    ) {
        super(optionsModel);
    }
}
