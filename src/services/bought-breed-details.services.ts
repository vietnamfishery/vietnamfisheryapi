import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { boughtbreeddetailsOptions } from '../models/objects';

export class BoughtBreedDetailsServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = boughtbreeddetailsOptions;
    constructor() {
        super(BoughtBreedDetailsServives.optionsModel);
        this.models = this.conn.boughtbreeddetailsModel;
    }
}
