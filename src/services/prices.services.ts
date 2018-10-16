import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pricesOptions } from '../models/objects';

export class PricesServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pricesOptions;
    constructor() {
        super(PricesServices.optionsModel);
        this.models = this.conn.pricesModel;
    }
}
