import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { ownerBreedOptions } from '../models/objects';

export class BreedOwnwerServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = ownerBreedOptions;
    constructor() {
        super(BreedOwnwerServices.optionsModel);
        this.models = this.conn.breedOwnerModel;
    }
}
