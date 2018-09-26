import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { actionServices, modelName } from '../common';
import { IOptionsModelDB } from '../interfaces';

export abstract class BaseServices {
    private conn: DBHelper;
    protected models: Sequeliz.Model<{}, any>;

    constructor(
        protected optionsModel: IOptionsModelDB = {
            name: '',
            model: {},
            deleteMode: {}
        }
    ) {
        this.conn = new DBHelper(optionsModel);
        this.models = this.conn.model;
    }

    public save = async (entity: any, action: actionServices) => {
        if(action === actionServices.ADD) {
            return new Promise(async (resolve, reject) => {
                resolve(await this.models.create(entity));
            });
        } else if (action === actionServices.EDIT) {
            return new Promise(async (resolve, reject) => {
                resolve(await this.models.upsert(entity));
            });
        }
    }
}
