import { BaseComponent } from '../baseComponents';
import { DistrictServives } from '../../services';
import { Promise } from '../../lib';

export class District extends BaseComponent {
    private districtServives: DistrictServives;
    public districtid: string;
    public name: string;
    public type: string;
    public location: string;
    public provinceid: string;

    constructor() {
        super();
        this.districtServives = new DistrictServives();
    }

    getAllDistrict(): Promise<District[]> {
        return new Promise((resolve, reject) => {
            this.districtServives.getAll(null).then((res: any[])  => {
                resolve(res);
            });
        });
    }

    getDistrictByProvinceId(proId): Promise<District[]> {
        return new Promise((resolve, reject) => {
            this.districtServives.getByProviceId(proId).then((res: any[])  => {
                resolve(res);
            });
        });
    }
}
