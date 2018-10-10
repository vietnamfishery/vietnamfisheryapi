import { UserRolesServices } from '../../services';
import { userrolesOptions } from '../../models/objects';
import { BaseComponent } from '../baseComponents';
import { Promise } from '../../lib';

export class UserRoles extends BaseComponent {
    public userRolesServices: UserRolesServices;
    public constructor(
        public userId: string,
        public roles: number
    ) {
        super();
        this.userRolesServices = new UserRolesServices({
            name: userrolesOptions.tableName,
            model: userrolesOptions.attributes,
            deleteMode: userrolesOptions.options
        });
    }
}
