import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { diedfisherysOptions } from '../models/objects';

export class DiedFisherysServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = diedfisherysOptions;
    constructor(
    ) {
        super(DiedFisherysServives.optionsModel);
        this.models = this.conn.diedfisherysModel;
    }
}
