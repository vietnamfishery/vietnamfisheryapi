import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { seasonOptions } from '../models/objects';
import { ActionAssociateDatabase } from '../common';

export class SeasonServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = seasonOptions;
    constructor() {
        super(SeasonServices.optionsModel);
        this.models = this.conn.seasonModel;
    }

    seasonWithUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            const query: any = {
                include: [
                    {
                        model: (this.models as any).sequelize.models.users,
                        as: ActionAssociateDatabase.SEASON_2_USER,
                        where: {
                            userId: 103
                        }
                    },
                ],
                limit: 1,
                order: [
                    ['seasonId', 'DESC']
                ]
            };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }
}
