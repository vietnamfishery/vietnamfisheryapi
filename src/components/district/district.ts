import { BaseComponent } from '../baseComponents';
import { DistrictServives } from '../../services';

export class District extends BaseComponent {
    public districtServives: DistrictServives;
    private districtid: string;
    private name: string;
    private type: string;
    private location: string;
    private provinceid: string;

    constructor() {
        super();
        this.districtServives = new DistrictServives();
        this.services = this.districtServives;
    }

    public setDistrictid(districtid: string) {
        this.districtid = districtid;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setType(type: string) {
        this.type = type;
    }

    public setLocation(location: string) {
        this.location = location;
    }

    public setProvinceid(provinceid: string) {
        this.provinceid = provinceid;
    }

    public get getDistrictId() {
        return this.districtid;
    }

    public get getDistrictName() {
        return this.name;
    }

    public get getDistrictType() {
        return this.type;
    }

    public get getDistrictLocation() {
        return this.location;
    }

    public get getProvinceIdWithDistrict() {
        return this.provinceid;
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
