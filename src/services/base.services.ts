import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { IOptionsModelDB } from '../interfaces';
import { Promise } from '../lib';

export abstract class BaseServices {
    public conn: DBHelper;
    public models: Sequeliz.Model<{}, any>;
    constructor(protected optionsModel: IOptionsModelDB = {
        tableName: '',
        attributes: {},
        options: {}
    }) {
        this.conn = new DBHelper(this.optionsModel);
    }

    public getById(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.models.findById(id).then((obj: any) => {
                if (obj) {
                    resolve(obj.dataValues);
                } else {
                    resolve(obj);
                }
            });
        });
    }

    public getAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.models.findAll().then((obj: any[]) => {
                resolve(obj);
            });
        });
    }
}
