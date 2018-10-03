import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { stockingOptions } from '../models/objects';

export class StockingServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: stockingOptions.tableName,
            model: stockingOptions.attributes,
            deleteMode: stockingOptions.options
        }
    ) {
        super(optionsModel);
    }
}
