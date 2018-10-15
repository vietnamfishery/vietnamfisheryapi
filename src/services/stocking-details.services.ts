import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { stockingdetailOptions } from '../models/objects';

export class StockingDetailsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = stockingdetailOptions;
    constructor() {
        super(StockingDetailsServices.optionsModel);
        this.models = this.conn.stockingdetailsModel;
    }
}
