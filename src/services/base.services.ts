import * as Sequeliz from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { actionServices, modelName } from '../common';
import { IOptionsModelDB } from '../interfaces';
import { BoughtBreedDetailsServives, BoughtBreedServives, PondsServices, RolesUsersServices, CouponServives, SeasonServices, UserServives } from './';
import { boughtbreeddetailsOptions, boughtbreedOptions, pondOptions, rolesusersOptions, couponOptions, seasonOptions, userOptions } from '../models/objects';

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
}
