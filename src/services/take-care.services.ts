import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { takecareOptions } from '../models/objects';

export class TakeCareServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = takecareOptions;
    constructor() {
        super(TakeCareServices.optionsModel);
        this.models = this.conn.takecareModel;
    }
}
