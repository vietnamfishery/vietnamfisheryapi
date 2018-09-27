import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondpreparedetailOptions } from '../models';

export class PondPrepareDetailsServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: pondpreparedetailOptions.tableName,
            model: pondpreparedetailOptions.attributes,
            deleteMode: pondpreparedetailOptions.options
        }
    ) {
        super(optionsModel);
    }
}
