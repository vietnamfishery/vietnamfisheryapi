import { actionUserServices } from '../common';

export class BaseComponent {
    public constructor() {}
    protected getQuery(...args: any[]): any {
        const action: string = args[0] || null;

        if(action === actionUserServices.REGISTER) {
            return {
                user: args[1],
                roles: args[2]
            };
        }
        if(action === actionUserServices.LOGIN) {
            return {
                where: args[1]
            };
        }
        if(action === actionUserServices.USERINFO) {
            return {
                where: args[1]
            };
        }
    }
}
