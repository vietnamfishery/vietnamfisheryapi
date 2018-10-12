import { BaseComponent } from '../baseComponents';
import { ProvinceServices } from '../../services';
import { provinceOptions } from '../../models/objects';
import { Promise } from '../../lib';

export class Province extends BaseComponent {
    private provinceServices: ProvinceServices;
    public provinceid: string;
    public name: string;
    public type: string;

    constructor() {
        super();
        this.provinceServices = new ProvinceServices({
            name: provinceOptions.tableName,
            model: provinceOptions.attributes,
            deleteMode: provinceOptions.options,
        });
    }

    getAllProvince(): Promise<Province[]> {
        return  new Promise((resolve, reject) => {
            this.provinceServices.getAll().then((res: any[])  => {
                resolve(res);
            });
        });
    }
}
