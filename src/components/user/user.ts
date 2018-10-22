import { Enscrypts } from '../../lib/';
import { UserServives } from '../../services';
import { BaseComponent } from '../baseComponents';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class User extends BaseComponent {
    private userServices: UserServives;
    private userUUId: string;
    private firstname: string;
    private lastname: string;
    private username: string;
    private password: string;
    private birthday: Date;
    private email: string;
    private phone: string;
    private address: string;
    private town: string;
    private district: string;
    private province: string;
    private status: number;
    private images: string;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;

    constructor() {
        super();
        this.userServices = new UserServives();
        this.services = this.userServices;
        this.primary = {
            username: this.getUsername
        };
        this.foreignKey = [

        ];
    }

    public set setUserUUId(userUUId: string) {
        this.userUUId = userUUId;
    }

    public set setFirstname(firstname: string) {
        this.firstname = firstname;
    }

    public set setLastname(lastname: string) {
        this.lastname = lastname;
    }

    public set setUsername(username: string) {
        this.username = username.toLowerCase().trim();
    }

    public set setPassword(password: string) {
        this.password = password;
    }

    public set setBirthday(birthday: Date) {
        this.birthday = birthday;
    }

    public set setEmail(email: string) {
        this.email = email;
    }

    public set setPhone(phone: string) {
        this.phone = phone;
    }

    public set setAddress(address: string) {
        this.address = address;
    }

    public set setTown(town: string) {
        this.town = town;
    }

    public set setDistrict(district: string) {
        this.district = district;
    }

    public set setProvince(province: string) {
        this.province = province;
    }

    public set setStatus(status: number) {
        this.status = status;
    }

    public set setImages(images: string) {
        this.images = images;
    }

    public set setCreatedBy(createdBy: string) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public set setUpdatedDate(updatedDate: Date) {
        this.updatedDate = updatedDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setUser(
        userUUId: string,
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        birthday: Date,
        email: string,
        phone: string,
        address: string,
        town: string,
        district: string,
        province: string,
        status: number,
        images: string,
        createdBy: string,
        createdDate: Date,
        updatedBy: string,
        updatedDate: Date,
        isDeleted: number
    ) {
        this.setUserUUId = userUUId;
        this.setFirstname = firstname;
        this.setLastname = lastname;
        this.setUsername = username;
        this.setPassword = password;
        this.setBirthday = birthday;
        this.setEmail = email;
        this.setPhone = phone;
        this.setAddress = address;
        this.setTown = town;
        this.setDistrict = district;
        this.setProvince = province;
        this.setStatus = status;
        this.setImages = images;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getUserUUId() {
        return this.userUUId;
    }

    public get getFirstname() {
        return this.firstname;
    }

    public get getLastname() {
        return this.lastname;
    }

    public get getUsername() {
        return this.username;
    }

    public get getPassword() {
        return this.password;
    }

    public get getBirthday() {
        return this.birthday;
    }

    public get getEmail() {
        return this.email;
    }

    public get getPhone() {
        return this.phone;
    }

    public get getAddress() {
        return this.address;
    }

    public get getTown() {
        return this.town;
    }

    public get getDistrict() {
        return this.district;
    }

    public get getProvince() {
        return this.province;
    }

    public get getStatus() {
        return this.status;
    }

    public get getImages() {
        return this.images;
    }

    public get getCreatedBy() {
        return this.createdBy;
    }

    public get getCreatedDate() {
        return this.createdDate;
    }

    public get getUpdatedBy() {
        return this.updatedBy;
    }

    public get getUpdatedDate() {
        return this.updatedDate;
    }

    public get getIsDeleted() {
        return this.isDeleted;
    }

    public register(action: string, roles?: number): Promise<User> {
        if(action === ActionServer.REGISTER && !roles) {
            return new Promise((resolve, reject) => {
                Enscrypts.getSalt(12).then(salt => {
                    Enscrypts.hashing(this.password, salt).then(hash => {
                        this.setPassword = hash;
                        const query = this.createQuery({
                            action,
                            data: {
                                that: this,
                                roles: 0
                            }
                        });
                        this.userServices.register(query).then((user: User) => {
                            resolve(user);
                        });
                    });
                });
            });
        }
    }

    public login(action: ActionServer): Promise<User> {
        const query = this.createQuery({
            action,
            data: {
                username: this.getUsername
            }
        });
        return new Promise((resolve, reject) => {
            this.userServices.getUserByUsername(query).then((user$: User) => {
                resolve(user$);
            });
        });
    }

    public getUserInfo(action: ActionServer): Promise<User> {
        const query = this.createQuery({
            action,
            data: {
                username: this.getUsername
            }
        });
        return new Promise((resolve, reject) => {
            this.userServices.getUserInfo(query).then((user$: User) => {
                resolve(user$);
            });
        });
    }

    public updateMyProfile(action): Promise<User> {
        const query = this.createQuery({
            action,
            primary: {
                username: this.getUsername
            }
        });
        return new Promise((resolve, reject) => {
            this.userServices.updateMyProfile(this, query).then(res => {
                resolve(res);
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
                        fields: this.getFields(this)
                    }).then((res: any) => {
                        resolve(res);
                    });
                });
            });
        });
    }
}
