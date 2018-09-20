import { Signin } from './signin';
import { Enscrypt } from '../../lib/Enscrypt';

export class User {

    public constructor(
        private uuid: string,
        protected firstName: string,
        protected lastName: string,
        private username: string,
        private password: string,
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
        private cretatedDate: Date,
        private updateddDate: Date,
        private isDeleted: boolean
    ){
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.birdthday = birdthday;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.town = town;
        this.district = district;
        this.province = province;
        this.roles = roles;
        this.status = status;
        this.images = images;
        this.cretatedDate = cretatedDate;
        this.updateddDate = updateddDate;
        this.isDeleted = isDeleted;
    }

    public getFirstname(): string {
        return this.firstName;
    }

    public getFullName(): string{
        return `${ this.lastName } ${ this.firstName }`
    }

    public async signin() {
        const salt = await Enscrypt.getSalt();
        return salt;
    }
}