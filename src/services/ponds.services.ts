import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondOptions } from '../models';

export class PondsServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: pondOptions.tableName,
            model: pondOptions.attributes,
            deleteMode: pondOptions.options
        }
    ) {
        super(optionsModel);
    }
}
