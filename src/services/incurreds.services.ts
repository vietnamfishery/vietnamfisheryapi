import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { incurredsOptions } from '../models/objects';

export class IncurredsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = incurredsOptions;
    constructor() {
        super(IncurredsServices.optionsModel);
        this.models = this.conn.incurredModel;
    }
}
