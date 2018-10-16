import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { harvestOptions } from '../models/objects';

export class HarvestsServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = harvestOptions;
    constructor() {
        super(HarvestsServives.optionsModel);
        this.models = this.conn.harvestModel;
    }
}
