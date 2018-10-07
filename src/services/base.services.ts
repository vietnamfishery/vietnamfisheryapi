import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { actionServices, modelName } from '../common';
import { IOptionsModelDB } from '../interfaces';
import { Promise } from '../lib';

export abstract class BaseServices {
    protected conn: DBHelper;
    protected models: Sequeliz.Model<{}, any>;
    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: '',
            model: {},
            deleteMode: {}
        }
    ) {
        this.conn = new DBHelper(optionsModel);
    }

    public getById(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.models.findById(id).then((obj: any) => {
                if(obj) {
                    resolve(obj.dataValues);
                } else {
                    resolve(obj);
                }
            });
        });
    }

    public getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.models.find().then((obj: any) => {
                if(obj) {
                    resolve(obj.dataValues);
                } else {
                    resolve(obj);
                }
            });
        });
    }
}
