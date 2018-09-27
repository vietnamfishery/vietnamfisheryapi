import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { usingveterinaryOptions } from '../models';

export class UsingVeterinaryServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: usingveterinaryOptions.tableName,
            model: usingveterinaryOptions.attributes,
            deleteMode: usingveterinaryOptions.options
        }
    ) {
        super(optionsModel);
    }
}
