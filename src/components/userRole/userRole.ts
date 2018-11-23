import { UserRolesServices } from '../../services';
import { BaseComponent } from '../baseComponents';

export class UserRole extends BaseComponent {
    public userRolesServices: UserRolesServices;
    private rolesId: number;
    private bossId: number;
    private userId: number;
    private roles: number;
    private createdDate: Date;
    private updatedBy: string;
    private isDeleted: number;

    public constructor() {
        super();
        this.userRolesServices = new UserRolesServices();
        this.services = this.userRolesServices;
    }

    public set setRolesId(rolesId: number) {
        this.rolesId = rolesId;
    }

    public set setBossId(bossId: number) {
        this.bossId = bossId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setRoles(roles: number) {
        this.roles = roles;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setUserRoles(
        rolesId: number,
        bossId: number,
        userId: number,
        roles: number,
        createdDate?: Date,
        updatedBy?: string,
        isDeleted?: number
    ) {
        this.setRolesId = rolesId;
        this.setBossId = bossId;
        this.setUserId = userId;
        this.setRoles = roles;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setIsDeleted = isDeleted;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getBossId(): number {
        return this.bossId;
    }

    public get getUserId(): number {
        return this.userId;
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
