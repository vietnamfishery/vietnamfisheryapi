import { actionUserServices, ActionServer, IOptionQuery } from '../common';
import { Promise } from '../lib';
import { BaseServices } from '../services';

export class BaseComponent {
    protected services: BaseServices;
    protected primary: object;
    protected foreignKey: any;
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
                const attributes: any = options.attributes ? {attributes: options.attributes} : null;
                return { ...data, ...pagination, ...order, ...attributes };
            case ActionServer.INSERT:
                return options.data;
            case ActionServer.UPDATE:
                const data$: any = {where: options.primary};
                const updateFields: any = {fields: this.getFields(options.data)};
                return { ...data$, ...updateFields };
            case ActionServer.REGISTER:
                return {
                    data: options.data.that,
                    roles: options.data.roles
                };
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

    upsert(action: string): Promise<any> {
        const that: any = this;
        if(action === ActionServer.INSERT) {
            return new Promise((resolve, reject) => {
                this.services.insert(this).then((res: any) => {
                    resolve(res);
                });
            });
        }
        if(action === ActionServer.UPDATE) {
            const query = this.createQuery({
                action,
                primary: that.getPrimary,
                data: this
            });
            return new Promise((resolve, reject) => {
                this.services.update(this, query).then((res: any) => {
                    resolve(res);
                });
            });
        }
    }

    gets(action: any, options?: object): Promise<any> {
        const that: any = this;
        const query = that.createQuery({
            action
        });
        return new Promise((resolve, reject) => {
            this.services.getAll(query).then(res => {
                resolve(res);
            });
        });
    }

    getById(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.services.getById(id).then(res => {
                resolve(res);
            });
        });
    }
}
