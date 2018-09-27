import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { harvestOptions } from '../models';

export class HarvestsServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: harvestOptions.tableName,
            model: harvestOptions.attributes,
            deleteMode: harvestOptions.options
        }
    ) {
        super(optionsModel);
    }
}
