import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { stockingOptions } from '../models/objects';

export class StockingServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = stockingOptions;
    constructor() {
        super(StockingServices.optionsModel);
        this.models = this.conn.stockingModel;
    }
}
