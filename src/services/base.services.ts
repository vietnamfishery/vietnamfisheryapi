import { ModelBuilder } from './../models/associations/model-builder';
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
}
