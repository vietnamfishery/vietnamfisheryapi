import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { provinceOptions } from '../models/objects';

export class ProvinceServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB
    ) {
        super(optionsModel);
        this.models = this.conn.provinceModel;
    }
}
