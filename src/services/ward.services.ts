import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { wardOptions } from '../models/objects';
import { Promise } from '../lib';

export class WardServices extends BaseServices {
    constructor(
        protected optionsModel: IOptionsModelDB
    ) {
        super(optionsModel);
        this.models = this.conn.wardModel;
    }

    getAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.models.findAll({
                offset: 0,
                limit: 50
            }).then((obj: any) => {
                resolve(obj);
            });
        });
    }

    getByDistrictId(id): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.models.findAll({
                where: {
                    districtid: id
                }
            }).then((obj: any) => {
                resolve(obj);
            });
        });
    }
}
