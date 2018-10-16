import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { couponOptions } from '../models/objects';

export class CouponServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = couponOptions;
    constructor() {
        super(CouponServives.optionsModel);
        this.models = this.conn.couponModel;
    }
}
