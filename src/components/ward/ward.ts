import { BaseComponent } from '../baseComponents';
import { WardServices } from '../../services';
import { Promise } from '../../lib';

export class Ward extends BaseComponent {
    public wardServices: WardServices;
    private wardid: string;
    private name: string;
    private type: string;
    private location: string;
    private districtid: string;

    constructor() {
        super();
        this.wardServices = new WardServices();
    }

    public set setWardid(wardid: string) {
        this.wardid = wardid;
    }

    public set setName(name: string) {
        this.name = name;
    }

    public set setType(type: string) {
        this.type = type;
    }

    public set setLocation(location: string) {
        this.location = location;
    }

    public set setDistrictid(districtid: string) {
        this.districtid = districtid;
    }

    public get getWardid(): string {
        return this.wardid;
    }

    public get getName(): string {
        return this.name;
    }

    public get getType(): string {
        return this.type;
    }

    public get getLocation(): string {
        return this.location;
    }

    public get getDistrictid(): string {
        return this.districtid;
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
