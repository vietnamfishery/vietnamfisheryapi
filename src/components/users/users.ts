import { Enscrypt } from '../../lib/Enscrypt';
import * as Sequeliz from 'sequelize';
import { UserServives } from '../../services';
import { actionUserServices } from '../../common';

export class User {
    private userServices: UserServives;
    public constructor(
        private userUUId: string,
        protected firstName: string,
        protected lastName: string,
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
        this.userServices = new UserServives();
    }

    public async signin() {
        this.password = await Enscrypt.hashing(this.password, (await Enscrypt.getSalt(12)));
        return await this.userServices.register(this);
    }
}
