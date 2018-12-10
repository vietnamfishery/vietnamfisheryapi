import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { pondOptions } from '../models/objects';
import { UserRolesServices, PondUserRolesServices, UserServives } from './';
import { ActionAssociateDatabase } from '../common';
import { Promise } from '../lib';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../helpers/db-helpers';
import { UserRole, PondUserRole, Pond } from '../components';

export class PondsServices extends BaseServices {
    protected static optionsModel: IOptionsModelDB = pondOptions;
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private userServives: UserServives = new UserServives();
    constructor() {
        super(PondsServices.optionsModel);
        this.models = this.conn.pondsModel;
    }

    insert(entity: any): Promise<any> {
        const sequeliz: Sequelize = DBHelper.sequelize;
        return new Promise((resolve, reject) => {
            sequeliz.transaction({autocommit: false},(t: Transaction) => {
                return this.models.create(entity.pond);
            }).then((pond: any) => {
                if(pond) {
                    const pondUserRole: PondUserRole = new PondUserRole();
                    pondUserRole.setUserId = entity.userId;
                    pondUserRole.setPondId = pond.pondId;
                    return pondUserRole.pondUserRolesServices.models.create(pondUserRole);
                }
            }).then((roles: any) => {
                if(roles) {
                    resolve(roles);
                }
            }).catch(e => {
                return resolve(e);
            });
        });
    }

    get(entity: any): Promise<any> {
        const sequeliz: Sequelize = DBHelper.sequelize;
        return new Promise((resolve, reject) => {
            sequeliz.transaction({autocommit: false},(t: Transaction) => {
                return (new UserRole()).userRolesServices.models.findOne({
                    where: {
                        userId: entity.userId,
                        [this.Op.and]: {
                            [this.Op.or]: [
                                {roles: 0},
                                {roles: 1}
                            ]
                        }
                    }
                });
            }).then((roles) => {
                if(roles) {
                    return this.models.findAll({
                        include: [
                            {
                                model: this.pondUserRolesServices.models,
                                as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                                where: {
                                    userId: entity.userId
                                }
                            }
                        ]
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Bạn không có quyền truy cập API này.'
                    });
                }
            }).then((ponds: any) => {
                if(ponds) {
                    resolve({
                        success: true,
                        ponds
                    });
                }
            });
        });
    }

    getById(pondId: number, userId?: number): Promise<any> {
        const sequeliz: Sequelize = DBHelper.sequelize;
        return new Promise((resolve, reject) => {
            sequeliz.transaction({autocommit: false},(t: Transaction) => {
                return (new UserRole()).userRolesServices.models.findOne({
                    where: {
                        userId,
                        [this.Op.and]: {
                            [this.Op.or]: [
                                {roles: 0},
                                {roles: 1}
                            ]
                        }
                    }
                });
            }).then((roles) => {
                if(roles) {
                    return this.models.findOne({
                        include: [
                            {
                                model: this.pondUserRolesServices.models,
                                as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                                where: {
                                    userId
                                }
                            }
                        ],
                        where: {
                            pondId
                        }
                    });
                }
                else {
                    resolve({
                        success: false,
                        message: 'Bạn không có quyền truy cập API này.'
                    });
                }
            }).then((pond: any) => {
                if(pond) {
                    resolve({
                        success: true,
                        pond
                    });
                }
            });
        });
    }

    getQuery(criteria: any): any {
        return {
            include: [
                {
                    model: (this.models as any).sequelize.models.pondUserRoles,
                    as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                    where: criteria
                }
            ]
        };
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
                                as: ActionAssociateDatabase.POND_USER_ROLE_2_USER,
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
