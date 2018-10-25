import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondOptions } from '../models/objects';
import { UserRolesServices, PondUserRolesServices, UserServives } from './';
import { ActionAssociateDatabase } from '../common';

export class PondsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondOptions;
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private userServives: UserServives = new UserServives();
    constructor() {
        super(PondsServices.optionsModel);
        this.models = this.conn.pondsModel;
    }

    test = (): Promise<any> => {
        const md = this.models;
        return new Promise((resolve, reject) => {
            const query: any = {
                include: [
                    {
                        model: this.pondUserRolesServices.models,
                        as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                        attributes: ['rolesId', 'pondId'],
                        required: true,
                        include: [
                            {
                                model: this.userRolesServices.models,
                                include: [
                                    {
                                        model: (this.models as any).sequelize.models.users,
                                        as: ActionAssociateDatabase.USER_ROLES_2_USER,
                                        where: {
                                            userId: 103
                                        }
                                    }
                                ],
                                where: {
                                    [this.Op.or]: [
                                        {
                                            roles: 0
                                        },
                                        {
                                            roles: 1
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
                // attributes: ['pondName']
            };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }

    testAll = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.models.findOne({
                order: [
                    ['createdDate', 'DESC']
                ]
            }).then(res => {
                resolve(res);
            });
        });
    }
}
