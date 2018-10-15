import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondOptions } from '../models/objects';

export class PondsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondOptions;
    constructor(
    ) {
        super(PondsServices.optionsModel);
        this.models = this.conn.pondsModel;
    }
}
