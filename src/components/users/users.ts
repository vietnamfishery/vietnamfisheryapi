import { Enscrypts } from '../../lib/';
import { userOptions } from '../../models/objects';
import { UserServives, PondUserRolesServices, UserRolesServices, DistrictServives, ProvinceServices, WardServices } from '../../services';
import { BaseComponent } from '../baseComponents';
import { Promise } from '../../lib';
import { actionUserServices } from '../../common';

export class User extends BaseComponent {
    private userServices: UserServives;
    public constructor(
        public userUUId: string,
        public firstname: string,
        public lastname: string,
        public username: string,
        public password: string,
        public birthday: Date,
        public email: string,
        public phone: string,
        public address: string,
        public town: string,
        public district: string,
        public province: string,
        public status: number,
        public images: string,
        public createdBy: string,
        public createdDate: Date,
        public updatedBy: string,
        public updatedDate: Date,
        public isDeleted: number
    ) {
        super();
        this.userServices = new UserServives();
    }

    public register(entity: any): Promise<User> {
        if(entity.action === actionUserServices.REGISTER) {
            return new Promise((resolve, reject) => {
                Enscrypts.getSalt(12).then(salt => {
                    Enscrypts.hashing(this.password, salt).then(hash => {
                        this.password = hash;
                        this.username = this.username.toLowerCase().trim();
                        entity[`roles`] = 0;
                        const query = this.getQuery(entity.action, this, entity.roles);
                        this.userServices.register(query).then((user: User) => {
                            resolve(user);
                        });
                    });
                });
            });
        }
        if(entity.action === actionUserServices.ADD_CHILD) {
            return new Promise((resolve, reject) => {
                Enscrypts.getSalt(12).then(salt => {
                    Enscrypts.hashing(this.password, salt).then(hash => {
                        this.password = hash;
                        this[`roles`] = entity.roles;
                        this.userServices.registerChild(this).then((user: User) => {
                            resolve(user);
                        });
                    });
                });
            });
        }
    }

    public login(action: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userServices.getUserByUsername(this.getQuery(action, {username: this.username.toLowerCase().trim()})).then((user$: User) => {
                resolve(user$);
            });
        });
    }

    public updateMyProfile(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userServices.updateMyProfile(this, {
                where: {
                    username: this.username
                },
                fields: this.getUpdateFields(this)
            }).then(res => {
                resolve(res);
            });
        });
    }

    public getUserInfo(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userServices.getUserInfo(this.getQuery(actionUserServices.USERINFO, {username: this.username.toLowerCase().trim()})).then((user$: User) => {
                resolve(user$);
            });
        });
    }

    public changePassword(): Promise<any> {
        return new Promise((resolve, reject) => {
            Enscrypts.getSalt(12).then((salt: string) => {
                Enscrypts.hashing(this.password, salt).then((hash: string) => {
                    this.password = hash;
                    this.userServices.changePassword(this, {
                        where: {
                            username: this.username
                        },
                        fields: this.getUpdateFields(this)
                    }).then((res: any) => {
                        resolve(res);
                    });
                });
            });
        });
    }

    private getUpdateFields(obj: User): string[] {
        const that = this;
        const arr: string[] = [];
        for(const key in obj) {
            if(that[key] != null && that[key] !== '' && typeof that[key] !== 'object' && typeof that[key] !== 'function') {
                const type$ = typeof that[key] !== 'object';
                arr.push(key);
            }
        }
        return arr;
    }
}
