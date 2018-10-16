import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondprepareOptions } from '../models/objects';

export class PondPrepareServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondprepareOptions;
    constructor() {
        super(PondPrepareServices.optionsModel);
        this.models = this.conn.pondprepareModel;
    }
}
