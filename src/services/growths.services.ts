import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { growthOptions } from '../models/objects';

export class GrowthsServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = growthOptions;
    constructor(
    ) {
        super(GrowthsServives.optionsModel);
        this.models = this.conn.growthsModel;
    }
}
