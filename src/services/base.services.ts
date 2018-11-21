import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { IOptionsModelDB } from '../interfaces';
import { Promise } from '../lib';
import { ActionAssociateDatabase } from '../common';

export abstract class BaseServices {
    public conn: DBHelper;
    public models: Sequeliz.Model<{}, any>;
    public Op: Sequeliz.Operators = Sequeliz.Op;
    public fn: Sequeliz.fn;
    constructor(protected optionsModel: IOptionsModelDB = {
        tableName: '',
        attributes: {},
        options: {}
    }) {
        this.conn = new DBHelper(this.optionsModel);
    }

    public getById(id: any, userId?: number): Promise<{}> {
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

    public getAll(query: any, options?: any): Promise<any[]> {
        if(query) {
            return new Promise((resolve, reject) => {
                this.models.findAll(this.getQuery(query)).then((obj: any[]) => {
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

    public get(query: any): Promise<any[]> {
        return this.models.findAll(query);
    }

    insert(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.create(data).then((record: any) => {
                resolve(record);
            });
        });
    }

    update(value: any): Promise<any> {
        const md: any = this.models;
        const where: any = {};
        return new Promise((resolve, reject) => {
            const primaryFieldName: string = md.primaryKeyField;
            where[primaryFieldName] = value[primaryFieldName];
            this.models.update(value, {where}).then((res: any) => {
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

    getQuery(criteria: object): object {
        return {
            where: criteria
        };
    }
}
