import { BaseComponent } from '../baseComponents';
import { ProvinceServices } from '../../services';

export class Province extends BaseComponent {
    public provinceServices: ProvinceServices;
    private provinceid: string;
    private name: string;
    private type: string;

    constructor() {
        super();
        this.provinceServices = new ProvinceServices();
    }

    public set setProvinceid(provinceid: string) {
        this.provinceid = provinceid;
    }

    public set setName(name: string) {
        this.name = name;
    }

    public set setType(type: string) {
        this.type = type;
    }

    public setProvince(provinceid: string, name: string, type: string) {
        this.setProvinceid = provinceid;
        this.setName = name;
        this.setType = type;
    }

    public get getProvinceid(): string {
        return this.provinceid;
    }

    public get getName(): string {
        return this.name;
    }

    public get getType(): string {
        return this.type;
    }

    getAllProvince(): Promise<Province[]> {
        return  new Promise((resolve, reject) => {
            this.provinceServices.getAll(null).then((res: any[])  => {
                resolve(res);
            });
        });
    }
}
