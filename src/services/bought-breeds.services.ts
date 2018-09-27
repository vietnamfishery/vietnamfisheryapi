import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { boughtbreedOptions } from '../models';

export class BoughtBreedServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: boughtbreedOptions.tableName,
            model: boughtbreedOptions.attributes,
            deleteMode: boughtbreedOptions.options
        }
    ) {
        super(optionsModel);
    }
}
