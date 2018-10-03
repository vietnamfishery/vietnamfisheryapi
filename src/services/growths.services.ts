import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { growthOptions } from '../models/objects';

export class GrowthsServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: growthOptions.tableName,
            model: growthOptions.attributes,
            deleteMode: growthOptions.options
        }
    ) {
        super(optionsModel);
    }
}
