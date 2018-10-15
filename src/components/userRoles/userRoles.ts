import { UserRolesServices } from '../../services';
import { BaseComponent } from '../baseComponents';

export class UserRoles extends BaseComponent {
    public userRolesServices: UserRolesServices;
    public constructor(
        public userId: string,
        public roles: number,
        public createdBy?: string
    ) {
        super();
        this.userRolesServices = new UserRolesServices();
    }
}
