import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { materialOptions } from '../models/objects';

export class MaterialServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = materialOptions;
    constructor() {
        super(MaterialServives.optionsModel);
        this.models = this.conn.materialModel;
    }
}
