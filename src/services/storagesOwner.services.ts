import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { storageOwnerOptions } from '../models/objects';

export class StoregeOwnwerServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = storageOwnerOptions;
    constructor() {
        super(StoregeOwnwerServices.optionsModel);
        this.models = this.conn.ownerStoragesModel;
    }
}
