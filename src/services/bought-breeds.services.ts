import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { boughtbreedOptions } from '../models/objects';

export class BoughtBreedServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = boughtbreedOptions;
    constructor(
    ) {
        super(BoughtBreedServives.optionsModel);
        this.models = this.conn.boughtbreedsModel;
    }
}
