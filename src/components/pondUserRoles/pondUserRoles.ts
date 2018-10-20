import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondUserRoles extends BaseComponent {
    private pondUserRolesServices: PondUserRolesServices;
    private rolesId: number;
    private pondId: number;
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

    public setPondUserRoles(rolesId: number, pondId: number) {
        this.setRolesId = rolesId;
        this.setPondId = pondId;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

}
