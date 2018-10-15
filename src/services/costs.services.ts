import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { costsOptions } from '../models/objects';

export class CostsServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = costsOptions;
    constructor() {
        super(CostsServives.optionsModel);
        this.models = this.conn.costsModel;
    }
}
