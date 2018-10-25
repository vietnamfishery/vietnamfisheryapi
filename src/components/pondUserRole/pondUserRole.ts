import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondUserRole extends BaseComponent {
    private pondUserRolesServices: PondUserRolesServices;
    private rolesId: number;
    private pondId: number;
    private isDeleted: number;
    constructor() {
        super();
        this.pondUserRolesServices = new PondUserRolesServices();
        this.services = this.pondUserRolesServices;
    }

    public set setRolesId(rolesId) {
        this.rolesId = rolesId;
    }

    public set setPondId(pondId) {
        this.pondId = pondId;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPondUserRoles(rolesId: number, pondId: number, isDeleted?: number) {
        this.setRolesId = rolesId;
        this.setPondId = pondId;
        this.setIsDeleted = isDeleted;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
