import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { couponOptions } from '../models/objects';

export class CouponServives extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: couponOptions.tableName,
            model: couponOptions.attributes,
            deleteMode: couponOptions.options
        }
    ) {
        super(optionsModel);
    }
}
