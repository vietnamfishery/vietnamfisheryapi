import { BaseComponent } from '../baseComponents';
import { ProvinceServices } from '../../services';
import { Promise } from '../../lib';

export class Province extends BaseComponent {
    private provinceServices: ProvinceServices;
    public provinceid: string;
    public name: string;
    public type: string;

    constructor() {
        super();
        this.provinceServices = new ProvinceServices();
    }

    getAllProvince(): Promise<Province[]> {
        return  new Promise((resolve, reject) => {
            this.provinceServices.getAll(null).then((res: any[])  => {
                resolve(res);
            });
        });
    }
}
