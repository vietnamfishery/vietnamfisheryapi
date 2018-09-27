import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { ponddiaryOptions } from '../models';

export class PondDiaryServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: ponddiaryOptions.tableName,
            model: ponddiaryOptions.attributes,
            deleteMode: ponddiaryOptions.options
        }
    ) {
        super(optionsModel);
    }
}
