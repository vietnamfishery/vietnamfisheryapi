import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { storagesOptions } from '../models/objects';

export class StoregeServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = storagesOptions;
    constructor() {
        super(StoregeServices.optionsModel);
        this.models = this.conn.storagesModel;
    }
}
