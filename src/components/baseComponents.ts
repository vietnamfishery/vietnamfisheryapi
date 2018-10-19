import { actionUserServices, ActionServer, IOptionQuery } from '../common';
import { Promise } from '../lib';

export class BaseComponent {
    protected services: any;
    public constructor() {}

    protected createQuery(options: IOptionQuery) {
        switch(options.action) {
            case ActionServer.GET:
                const data: any = options.data ? {where: options.data} : null;
                const pagination: any = options.pagination ? {
                    offset: options.pagination.offset,
                    limit: options.pagination.limit
                } : null;
                const order: any = options.order ? {order: options.order} : null;
                return { ...data, ...pagination, ...order };
            case ActionServer.INSERT:
                return options.data;
            case ActionServer.UPDATE:
                const data$: any = {where: options.data.primary};
                const updateFields: any = {fields: this.getFields(options.data)};
                return { ...data$, ...updateFields };
            default:
                return {};
        }
    }

    protected getQuery(...args: any[]): any {
        const action: string = args[0] || null;

        switch(action) {
            case actionUserServices.REGISTER:
                return {
                    user: args[1],
                    roles: args[2]
                };
            case actionUserServices.LOGIN:
                return {
                    where: args[1]
                };
            case actionUserServices.USERINFO:
                return {
                    where: args[1]
                };
            case ActionServer.AUTH:
                return {
                    where: {
                        userId: args[1] // tham so thu 2 la userId
                    }
                };
            case ActionServer.INSERT:
                return {
                    fields: args[1]
                };
            default:
                return null;
        }
    }

    protected getFields(obj: any): string[] {
        const that = this;
        const arr: string[] = [];
        for(const key in obj) {
            if(that[key] !== null && that[key] !== undefined && that[key] !== '' && typeof that[key] !== 'object' && typeof that[key] !== 'function') {
                arr.push(key);
            }
        }
        return arr;
    }

    // public getWithForeignkey(obj: any) {

    // }

    upsert(action: string): Promise<any> {
        const that = this;
        if(action === ActionServer.INSERT) {
            return new Promise((resolve, reject) => {
                that.services.insert(this/*this.getQuery(action,this.getFields(that))*/).then((res: any) => {
                    resolve(res);
                });
            });
        }
    }
}
