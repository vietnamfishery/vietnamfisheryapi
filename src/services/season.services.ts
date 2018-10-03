import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonOptions } from '../models/objects';

export class SeasonServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: seasonOptions.tableName,
            model: seasonOptions.attributes,
            deleteMode: seasonOptions.options
        }
    ) {
        super(optionsModel);
    }
}
