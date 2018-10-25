import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonAndPondOptions } from '../models/objects';

export class SeasonAndPondServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = seasonAndPondOptions;
    constructor() {
        super(SeasonAndPondServices.optionsModel);
        this.models = this.conn.seasonAndPondModel;
    }
}
