import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { takecareOptions } from '../models/objects';

export class TakeCareServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: takecareOptions.tableName,
            model: takecareOptions.attributes,
            deleteMode: takecareOptions.options
        }
    ) {
        super(optionsModel);
    }
}
