import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userOptions } from '../models/objects';
import { Promise } from '../lib';
import DBHelper from '../helpers/db-helpers';
import { Sequelize, Transaction } from 'sequelize';
import { UserRole } from '../components';
import { ActionAssociateDatabase } from '../common';

export class UserServives extends BaseServices {
    protected static optionsModel: IOptionsModelDB = userOptions;
    constructor() {
        super(UserServives.optionsModel);
        this.models = this.conn.usersModel;
    }

    public register(entity: any): Promise<any> {
        const sequeliz: Sequelize = DBHelper.sequelize;
        return new Promise((resolve, reject) => {
            sequeliz.transaction({autocommit: true},(t: Transaction) => {
                return this.models.create(entity.user);
            }).catch(e => {
                return resolve(e);
            }).then((user: any) => {
                if(user) {
                    const userRoles: UserRole = new UserRole();
                    userRoles.setUserId = user.userId;
                    userRoles.setRoles = entity.roles;
                    return userRoles.userRolesServices.models.create(userRoles);
                }
            }).catch(e => {
                return resolve(e);
            }).
            then((res: any) => {
                resolve(res ? res.dataValues : null);
            });
        });
    }

    public getUserByUsername(userCriteria: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.findOne(this.joinQuery(this.getQuery(userCriteria.getUsername))).then((user: any) => {
                if(user) {
                    resolve(user.dataValues);
                } else {
                    resolve(user);
                }
            });
        });
    }

    public registerChild(entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.create(entity).then((user) => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public updateMyProfile(entity: any, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.update(entity, options).then((user: any) => {
                resolve(user);
            });
        });
    }

    public changePassword(enity: any, query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.update(enity, query).then((data: any) => {
                resolve(data);
            });
        });
    }

    private joinQuery(userQuery: any): any {
        const include =  {
            include: [
                {
                    model: (this.models as any).sequelize.models.province,
                    as: ActionAssociateDatabase.USER_2_PRO,
                    require: true
                },
                {
                    model: (this.models as any).sequelize.models.district,
                    as: ActionAssociateDatabase.USER_2_DIS,
                    require: true
                },
                {
                    model: (this.models as any).sequelize.models.ward,
                    as: ActionAssociateDatabase.USER_2_WAR,
                    require: true
                }
            ],
            attributes: [`userId`, `userUUId`, `firstname`, `lastname`, `username`, `password`, `birthday`, `town`, `district`, `province`, `status`, `phone`, `email`, `images`, `createdBy`, `createdDate`, `updatedBy`, `updatedDate`, `isDeleted`]
        };
        return { ...userQuery, ...include };
    }

    getSeasonWithUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            const query: any = {
                include: [
                    {
                        model: (this.models as any).sequelize.models.seasons,
                        as: ActionAssociateDatabase.USER_2_SEASON,
                        limit: 1,
                        order: [
                            ['seasonId', 'DESC']
                        ]
                    }
                ]
            };
            this.models.findAll(query).then(res => {
                resolve(res);
            });
        });
    }

    getQuery(username: any): any {
        return {
            where: {
                username
            }
        };
    }
}
