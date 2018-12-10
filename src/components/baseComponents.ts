import { ISearchOptions } from '../common';
import { Promise } from '../lib';
import { BaseServices } from '../services';
import { FindOptions } from 'sequelize';

export class BaseComponent {
    protected services: BaseServices;
    protected primary: object;
    protected foreignKey: any;
    public constructor() { }

    protected criteriaQuery(options: ISearchOptions) {
        const offset: any = options.pageIndex ? Number(options.pageIndex) - 1 : null;
        const limit: any = options.pageSizes ? Number(options.pageSizes) : null;
        // const order: any[] = options.orderBy && options.orderType ? [
        //     [options.orderBy, options.orderType]
        // ] : options.orderBy && !options.orderType ? [
        //     [options.orderBy]
        // ] : null;
        return { ...offset, ...limit };
    }

    /**
     * remove null and undefine field, usually use to update action
     * @param obj
     */
    public getFields(obj?: any): string[] {
        const that: any = this;
        const object: any = {};
        for (const key in that) {
            if (that[key] !== null && that[key] !== undefined && typeof that[key] !== 'object' && typeof that[key] !== 'function' && !key.match(/^ge[t].+$/) || that[key] === 0) {
                if (that[key] || that[key] === 0) {
                    object[key] = that[key];
                }
            }
        }
        return object;
    }

    // upsert(action: any): Promise<any> {
    //     const that: any = this;
    //     if(action === ActionServer.UPDATE) {
    //         const query = {};
    //         // this.createQuery({
    //         //     action,
    //         //     primary: that.getPrimary,
    //         //     data: this
    //         // });
    //         // return new Promise((resolve, reject) => {
    //         //     this.services.update(this, query).then((res: any) => {
    //         //         resolve(res);
    //         //     });
    //         // });
    //     }
    // }

    insert(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.services.insert(this).then((res: any) => {
                resolve(res);
            });
        });
    }

    update(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.services.update(this.getFields(this)).then(res => {
                resolve(res);
            });
        });
    }

    gets(condition: FindOptions<any>, options?: ISearchOptions): Promise<any> {
        const gotOptions = this.criteriaQuery(options);
        return new Promise((resolve, reject) => {
            this.services.getAll({
                ...condition,
                ...gotOptions
            }).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            });
        });
    }

    getById(id: number, userId?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.services.getById(id, userId).then(res => {
                resolve(res);
            });
        });
    }
}
