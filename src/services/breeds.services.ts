import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { breedOptions } from '../models/objects';

export class BreedServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = breedOptions;
    constructor(
    ) {
        super(BreedServives.optionsModel);
        this.models = this.conn.breedsModel;
    }
}
