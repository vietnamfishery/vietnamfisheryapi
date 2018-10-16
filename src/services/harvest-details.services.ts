import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { harvestdetailOptions } from '../models/objects';

export class HarvestDetailsServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = harvestdetailOptions;
    constructor() {
        super(HarvestDetailsServives.optionsModel);
        this.models = this.conn.harvestdetailsModel;
    }
}
