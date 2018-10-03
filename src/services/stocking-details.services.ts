import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { stockingdetailOptions } from '../models/objects';

export class StockingDetailsServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: stockingdetailOptions.tableName,
            model: stockingdetailOptions.attributes,
            deleteMode: stockingdetailOptions.options
        }
    ) {
        super(optionsModel);
    }
}
