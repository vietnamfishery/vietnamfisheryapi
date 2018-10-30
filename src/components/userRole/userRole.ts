import { UserRolesServices } from '../../services';
import { BaseComponent } from '../baseComponents';

export class UserRole extends BaseComponent {
    public userRolesServices: UserRolesServices;
    private rolesId: number;
    private userId: number;
    private bossId: number;
    private roles: number;
    private createdDate: Date;
    private updatedBy: string;
    private isDeleted: number;

    public constructor() {
        super();
        this.userRolesServices = new UserRolesServices();
        this.services = this.userRolesServices;
    }

    public set setRolesId(rolesId) {
        this.rolesId = rolesId;
    }

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setBossId(bossId) {
        this.bossId = bossId;
    }

    public set setRoles(roles) {
        this.roles = roles;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy) {
        this.updatedBy = updatedBy;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setUserRoles(
        rolesId: number,
        userId: number,
        bossId: number,
        roles: number,
        createdDate?: Date,
        updatedBy?: string,
        isDeleted?: number
    ) {
        this.setRolesId = rolesId;
        this.setUserId = userId;
        this.setBossId = bossId;
        this.setRoles = roles;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setIsDeleted = isDeleted;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getBossId(): number {
        return this.bossId;
    }

    public get getRoles(): number {
        return this.roles;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getUpdatedBy(): string {
        return this.updatedBy;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
