import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondpreparedetailOptions } from '../models/objects';

export class PondPrepareDetailsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondpreparedetailOptions;
    constructor() {
        super(PondPrepareDetailsServices.optionsModel);
        this.models = this.conn.pondpreparedetailsModel;
    }
}
