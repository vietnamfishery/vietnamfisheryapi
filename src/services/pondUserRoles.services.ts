import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { ponduserrolesOptions } from '../models/objects';

export class PondUserRolesServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = ponduserrolesOptions;
    constructor() {
        super(PondUserRolesServices.optionsModel);
        this.models = this.conn.ponduserrolesModel ;
    }
    testpr = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            const query: any = {
                include: [
                    {
                        model: (this.models as any).sequelize.models.userroles,
                        // as: 'userroles'
                        limit: 1
                    }
                ]
            };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }
}
