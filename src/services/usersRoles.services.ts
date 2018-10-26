import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userrolesOptions } from '../models/objects';
import { ActionAssociateDatabase } from '../common';

export class UserRolesServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = userrolesOptions;
    constructor() {
        super(UserRolesServices.optionsModel);
        this.models = this.conn.userRolesModel;
    }

    testUserAssociate = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            const query: any = {
                include: [
                    {
                        model: (this.models as any).sequelize.models.users,
                        as: ActionAssociateDatabase.USER_ROLES_2_USER
                    }
                ]
            };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }

    getQuery(criteria: any): any {
        return {
            where: criteria
        };
    }
}
