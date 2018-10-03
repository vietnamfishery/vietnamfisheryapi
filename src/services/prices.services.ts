import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pricesOptions } from '../models/objects';

export class PricesServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: pricesOptions.tableName,
            model: pricesOptions.attributes,
            deleteMode: pricesOptions.options
        }
    ) {
        super(optionsModel);
    }
}
