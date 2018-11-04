import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondUserRole extends BaseComponent {
    public pondUserRolesServices: PondUserRolesServices;
    private pondUserRolesId: number;
    private rolesId: number;
    private pondId: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondUserRolesServices = new PondUserRolesServices();
        this.services = this.pondUserRolesServices;
    }

    public set setPondUserRolesId(id) {
        this.pondUserRolesId = id;
    }

    public set setRolesId(rolesId) {
        this.rolesId = rolesId;
    }

    public set setPondId(pondId) {
        this.pondId = pondId;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPondUserRoles(pondUserRolesId?: number, rolesId?: number, pondId?: number, createdDate?: Date, isDeleted?: number) {
        this.setPondUserRolesId = pondUserRolesId;
        this.setRolesId = rolesId;
        this.setPondId = pondId;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondUserRolesId(): number {
        return this.pondUserRolesId;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
