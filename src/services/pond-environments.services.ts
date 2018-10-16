import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondenvironmentsOptions } from '../models/objects';

export class PondEnvironmentsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondenvironmentsOptions;
    constructor() {
        super(PondEnvironmentsServices.optionsModel);
        this.models = this.conn.pondenvironmentsModel;
    }
}
