import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { boughtbreeddetailsOptions } from '../models/objects';

export class BoughtBreedDetailsServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: boughtbreeddetailsOptions.tableName,
            model: boughtbreeddetailsOptions.attributes,
            deleteMode: boughtbreeddetailsOptions.options
        }
    ) {
        super(optionsModel);
    }
}
