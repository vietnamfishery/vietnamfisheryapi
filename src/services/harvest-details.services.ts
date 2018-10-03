import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { harvestdetailOptions } from '../models/objects';

export class HarvestDetailsServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: harvestdetailOptions.tableName,
            model: harvestdetailOptions.attributes,
            deleteMode: harvestdetailOptions.options
        }
    ) {
        super(optionsModel);
    }
}
