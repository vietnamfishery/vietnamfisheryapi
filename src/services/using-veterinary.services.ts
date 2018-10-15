import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { usingveterinaryOptions } from '../models/objects';

export class UsingVeterinaryServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = usingveterinaryOptions;
    constructor() {
        super(UsingVeterinaryServices.optionsModel);
        this.models = this.conn.usingveterinaryModel;

    }
}
