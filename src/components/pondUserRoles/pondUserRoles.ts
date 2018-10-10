import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';
import { ponduserrolesOptions } from '../../models/objects';

export class PondUserRoles extends BaseComponent {
    private pondUserRolesServices: PondUserRolesServices;
    constructor(
        userId: number
    ) {
        super();
        this.pondUserRolesServices = new PondUserRolesServices({
            name: ponduserrolesOptions.tableName,
            model: ponduserrolesOptions.attributes,
            deleteMode: ponduserrolesOptions.options
        });
    }
}
