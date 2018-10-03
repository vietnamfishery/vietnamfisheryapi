import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { districtOptions } from '../models/objects';

export class DistrictServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: districtOptions.tableName,
            model: districtOptions.attributes,
            deleteMode: districtOptions.options
        }
    ) {
        super(optionsModel);
    }
}
