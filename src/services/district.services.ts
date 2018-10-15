import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';

export class DistrictServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB;
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
