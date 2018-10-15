import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { provinceOptions } from '@/models/objects';

export class ProvinceServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = provinceOptions;
    constructor(
    ) {
        super(ProvinceServices.optionsModel);
        this.models = this.conn.provinceModel;
    }
}
