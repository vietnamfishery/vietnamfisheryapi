import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { breedOptions } from '../models';

export class BreedServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: breedOptions.tableName,
            model: breedOptions.attributes,
            deleteMode: breedOptions.options
        }
    ) {
        super(optionsModel);
    }
}
