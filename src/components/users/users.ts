import { Enscrypts } from '../../lib/';
import * as Sequeliz from 'sequelize';
import { UserServives } from '../../services';
import { BaseComponent } from '../baseComponents';
import { Promise } from '../../lib';

export class User extends BaseComponent {
    private userServices: UserServives;
    public constructor(
        private userUUId: string,
        protected firstname: string,
        protected lastname: string,
        public username: string,
        public password: string,
        private birdthday: Date,
        private email: string,
        private phone: string,
        private address: string,
        private town: string,
        private district: string,
        private province: string,
        private roles: number,
        private status: number,
        private images: string,
        private createdBy: string,
        private createdDate: Date,
        private updatedBy: string,
        private updatedDate: Date,
        private isDeleted: number
    ) {
        super();
        this.userServices = new UserServives();
    }

    public register(): Promise<User> {
        return new Promise((resolve, reject) => {
            Enscrypts.getSalt(12).then(salt => {
                Enscrypts.hashing(this.password, salt).then(hash => {
                    this.password = hash;
                    this.userServices.register(this).then((user: User) => {
                        resolve(user);
                    });
                });
            });
        });
    }

    public login(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userServices.getUserByUsername(this.getQuery({username: this.username})).then((user$: User) => {
                resolve(user$);
            });
        });
    }
}
