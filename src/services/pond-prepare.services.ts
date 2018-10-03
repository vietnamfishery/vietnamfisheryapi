import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondprepareOptions } from '../models/objects';

export class PondPrepareServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: pondprepareOptions.tableName,
            model: pondprepareOptions.attributes,
            deleteMode: pondprepareOptions.options
        }
    ) {
        super(optionsModel);
    }
}
