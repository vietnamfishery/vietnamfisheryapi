import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { IOptionsModelDB } from '../interfaces';
import { Promise } from '../lib';

export abstract class BaseServices {
    public conn: DBHelper;
    public models: Sequeliz.Model<{}, any>;
    public Op: Sequeliz.Operators = Sequeliz.Op;
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

    public getAll(query: any): Promise<any[]> {
        if(query) {
            return new Promise((resolve, reject) => {
                this.models.findAll(query).then((obj: any[]) => {
                    resolve(obj);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                this.models.findAll().then((obj: any[]) => {
                    resolve(obj);
                });
            });
        }
    }

    insert(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.create(data).then((record: any) => {
                resolve(record);
            });
        });
    }

    test(): Promise<any> {
        const md = this.models;
        return new Promise((resolve, reject) => {
            this.models.count().then(res => {
                resolve(res);
            });
        });
    }
}
