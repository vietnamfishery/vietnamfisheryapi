import { BaseComponent } from '../baseComponents';
import { DistrictServives } from '../../services';
import { districtOptions } from '../../models/objects';
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
        // this.districtServives = new DistrictServives({
        //     name: districtOptions.tableName,
        //     model: districtOptions.attributes,
        //     deleteMode: districtOptions.options,
        // });
    }

    getAllDistrict(): Promise<District[]> {
        return  new Promise((resolve, reject) => {
            this.districtServives.getAll().then((res: any[])  => {
                resolve(res);
            });
        });
    }

    // getDistrictByProvinceId(proId): Promise<District[]> {
    //     return  new Promise((resolve, reject) => {
    //         this.districtServives.g().then((res: any[])  => {
    //             resolve(res);
    //         });
    //     });
    // }
}
