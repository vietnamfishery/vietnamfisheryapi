import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { diedfisherysOptions } from '../models';

export class DiedFisherysServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: diedfisherysOptions.tableName,
            model: diedfisherysOptions.attributes,
            deleteMode: diedfisherysOptions.options
        }
    ) {
        super(optionsModel);
    }
}
