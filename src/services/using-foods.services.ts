import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { usingfoodOptions } from '../models/objects';

export class UsingFoodsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = usingfoodOptions;
    constructor(
    ) {
        super(UsingFoodsServices.optionsModel);
        this.models = this.conn.usingfoodsModel;
    }
}
