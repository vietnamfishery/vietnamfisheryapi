import { BaseComponent } from '../baseComponents';
import { PondsServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Pond extends BaseComponent {
    private pondsServices: PondsServices;
    private latitude: number = null;
    private longitude: number = null;
    private pondId: string;
    private pondUUId: string;
    private userId: string;
    private pondName: string;
    private pondCreatedDate: Date;
    private pondArea: number;
    private pondDepth: number;
    private createCost: number;
    private status: number;
    private images: string;
    constructor() {
        super();
        this.pondsServices = new PondsServices();
        this.services = this.pondsServices;
    }

    private set setPondId(pondId) {
        this.pondId = pondId ? pondId : null;
    }

    private set setPondUUId(pondUUId) {
        this.pondUUId = pondUUId;
    }

    private set setUserId(userId) {
        this.userId = userId;
    }

    private set setPondName(pondName) {
        this.pondName = pondName;
    }

    private set setPondCreatedDate(pondCreatedDate) {
        this.pondCreatedDate = pondCreatedDate;
    }

    private set setPondArea(pondArea) {
        this.pondArea = pondArea;
    }

    private set setPondDepth(pondDepth) {
        this.pondDepth = pondDepth;
    }

    private set setCreateCost(createCost) {
        this.createCost = createCost;
    }

    private set setStatus(status) {
        this.status = status;
    }

    private set setImages(images) {
        this.images = images;
    }

    private set setLatitude(val) {
        this.latitude = val;
    }

    private set setLongitude(val) {
        this.longitude = val;
    }

    public setPond(pondId: string,pondUUId: string,userId: string,pondName: string,pondCreatedDate: Date,pondArea: number,pondDepth: number,createCost: number,status: number,images: string, latitude: number, longitude: number) {
        this.setPondId = pondId;
        this.setPondUUId = pondUUId;
        this.setUserId = userId;
        this.setPondName = pondName;
        this.setPondCreatedDate = pondCreatedDate;
        this.setPondArea = pondArea;
        this.setPondDepth = pondDepth;
        this.setCreateCost = createCost;
        this.setStatus = status;
        this.setImages = images;
        this.setLatitude = latitude;
        this.setLongitude = longitude;
    }

    public getAll(action, userId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.getAll(this.getQuery(action, userId)).then((pond: any) => {
                resolve(pond);
            });
        });
    }
}
