import { UserRolesServices } from '../../services';
import { BaseComponent } from '../baseComponents';

export class UserRoles extends BaseComponent {
    public userRolesServices: UserRolesServices;
    private rolesId: number;
    private userId: number;
    private roles: number;

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

    public set setRoles(roles) {
        this.roles = roles;
    }

    public setUserRoles(
        rolesId: number,
        userId: number,
        roles: number
    ) {
        this.setRolesId = rolesId;
        this.setUserId = userId;
        this.setRoles = roles;
    }

    public get getRolesId(): number {
        return this.rolesId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getRoles(): number {
        return this.roles;
    }
}
