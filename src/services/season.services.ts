import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonOptions } from '../models/objects';

export class SeasonServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = seasonOptions;
    constructor(){
        super(SeasonServices.optionsModel);
        this.models = this.conn.seasonModel;
    }
}
