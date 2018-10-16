import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { ponddiaryOptions } from '../models/objects';

export class PondDiaryServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = ponddiaryOptions;
    constructor() {
        super(PondDiaryServices.optionsModel);
        this.models = this.conn.ponddiaryModel;
    }
}
