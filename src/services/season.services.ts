import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonOptions } from '../models/objects';
import { Promise } from '../lib';
import { ActionAssociateDatabase } from '../common';

export class SeasonServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = seasonOptions;
    constructor() {
        super(SeasonServices.optionsModel);
        this.models = this.conn.seasonModel;
    }

    getAll(criteria: any, options: any): Promise<any[]> {
        return new Promise((resolve,reject) => {
            const where: any = {
                userId: options.userId
            };
            const query: any = { ...criteria, where };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }
}
