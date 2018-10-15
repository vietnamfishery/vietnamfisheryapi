import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';

export class PondUserRoles extends BaseComponent {
    private pondUserRolesServices: PondUserRolesServices;
    constructor(
        userId: number
    ) {
        super();
        this.pondUserRolesServices = new PondUserRolesServices();
    }
}
