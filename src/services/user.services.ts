import { BaseServices } from './base.services';
import { IOptionsModelDB } from '../interfaces';
import { userOptions } from '../models/objects';
import { Promise } from '../lib';
import DBHelper from '../helpers/db-helpers';
import { Sequelize, Transaction } from 'sequelize';
import { UserRoles } from '../components/userRoles';

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
            }).then((user) => {
                if(user) {
                    const userRoles: UserRoles = new UserRoles(user.userId, entity.roles);
                    return userRoles.userRolesServices.models.create(userRoles);
                } else {
                    return;
                }
            }).catch(e => {
                return resolve(e);
            }).
            then((res: any) => {
                resolve(res ? res.dataValues : null);
            });
        });
    }

    public getUserByUsername(userQuery: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.findOne(userQuery).then((user: any) => {
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
                if(user) {
                    resolve(user.dataValues);
                } else {
                    resolve(user);
                }
            });
        });
    }

    public getUserInfo(userQuery: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const query: any = this.joinQuery(userQuery);
            this.models.findOne(query).then((user: any) => {
                if(user) {
                    resolve(user.dataValues);
                } else {
                    resolve(user);
                }
            });
        });
    }

    private joinQuery(userQuery: any): any {
        const include =  {
            include: [
                {
                    model: (this.models as any).sequelize.models.province,
                    as: 'pro',
                    require: true,
                    attributes: ['name']
                },
                {
                    model: (this.models as any).sequelize.models.district,
                    as: 'dis',
                    require: true,
                    attributes: ['name', 'location']
                },
                {
                    model: (this.models as any).sequelize.models.ward,
                    as: 'war',
                    require: true,
                    attributes: ['name', `location`]
                }
            ],
            attributes: [`userId`, `userUUId`, `firstname`, `lastname`, `username`, `password`, `birthday`, `town`, `district`, `province`, `status`, `phone`, `email`, `images`, `createdBy`, `createdDate`, `updatedBy`, `updatedDate`, `isDeleted`, `pro.name`,`dis.name`, `war.name`]
        };
        return { ...userQuery, ...include };
    }
}
