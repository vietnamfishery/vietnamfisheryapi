import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonandpondOptions } from '../models/objects';

export class SeasonAndPondServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = seasonandpondOptions;
    constructor() {
        super(SeasonAndPondServices.optionsModel);
        this.models = this.conn.seasonAndPondModel;
    }
}
