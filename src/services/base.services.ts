import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { IOptionsModelDB } from '../interfaces';
import { Promise } from '../lib';
import { ActionAssociateDatabase } from '../common';

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

    update(entity: any, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.update(entity, options).then((res: any) => {
                resolve(res);
            });
        });
    }

    findAndCountAll(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(query) {
                this.models.findAndCountAll(query).then((res: any) => {
                    resolve(res);
                });
            } else {
                this.models.findAndCountAll().then((res: any) => {
                    resolve(res);
                });
            }
        });
    }
}
