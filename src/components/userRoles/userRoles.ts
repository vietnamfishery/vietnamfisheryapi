import { UserRolesServices } from '../../services';
import { userrolesOptions } from '../../models/objects';
import { BaseComponent } from '../baseComponents';

export class UserRoles extends BaseComponent {
    public userRolesServices: UserRolesServices;
    public constructor(
        public userId: string,
        public roles: number,
        public createdBy?: string
    ) {
        super();
        this.userRolesServices = new UserRolesServices({
            name: userrolesOptions.tableName,
            model: userrolesOptions.attributes,
            deleteMode: userrolesOptions.options
        });
    }
}
