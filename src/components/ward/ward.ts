import { BaseComponent } from '../baseComponents';
import { WardServices } from '../../services';
import { Promise } from '../../lib';

export class Ward extends BaseComponent {
    private wardServices: WardServices;
    public wardid: string;
    public name: string;
    public type: string;
    public location: string;
    public districtid: string;

    constructor() {
        super();
        this.wardServices = new WardServices();
    }

    getAllWard(): Promise<Ward[]> {
        return  new Promise((resolve, reject) => {
            this.wardServices.getAll().then((res: any[])  => {
                resolve(res);
            });
        });
    }

    getDistrictByDistrictId(disId): Promise<Ward[]> {
        return  new Promise((resolve, reject) => {
            this.wardServices.getByDistrictId(disId).then((res: any[])  => {
                resolve(res);
            });
        });
    }
}
