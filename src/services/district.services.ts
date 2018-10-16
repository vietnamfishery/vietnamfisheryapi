import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { districtOptions } from '../models/objects';

export class DistrictServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = districtOptions;
    constructor() {
        super(DistrictServives.optionsModel);
        this.models = this.conn.districtModel;
    }

    getByProviceId(id): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.models.findAll({
                where: {
                    provinceid: id
                }
            }).then((res: any) => {
                resolve(res);
            });
        });
    }
}
