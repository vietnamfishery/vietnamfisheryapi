import { BaseComponent } from '../baseComponents';
import { PondsServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Pond extends BaseComponent {
    private pondsServices: PondsServices;
    private pondId: number;
    private pondUUId: string;
    private userId: number;
    private pondName: string;
    private pondCreatedDate: Date;
    private pondArea: number;
    private pondDepth: number;
    private createCost: number;
    private status: number;
    private images: string;
    private pondLatitude: number = null;
    private pondLongitude: number = null;
    constructor() {
        super();
        this.pondsServices = new PondsServices();
        this.services = this.pondsServices;
    }

    public set setPondId(pondId) {
        this.pondId = pondId ? pondId : null;
    }

    public set setPondUUId(pondUUId) {
        this.pondUUId = pondUUId;
    }

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setPondName(pondName) {
        this.pondName = pondName;
    }

    public set setPondCreatedDate(pondCreatedDate) {
        this.pondCreatedDate = pondCreatedDate;
    }

    public set setPondArea(pondArea) {
        this.pondArea = pondArea;
    }

    public set setPondDepth(pondDepth) {
        this.pondDepth = pondDepth;
    }

    public set setCreateCost(createCost) {
        this.createCost = createCost;
    }

    public set setStatus(status) {
        this.status = status;
    }

    public set setImages(images) {
        this.images = images;
    }

    public set setLatitude(val) {
        this.pondLatitude = val;
    }

    public set setLongitude(val) {
        this.pondLongitude = val;
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
        this.setStatus = status - 0;
        this.setImages = images;
        this.setLatitude = latitude;
        this.setLongitude = longitude;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getPondUUId(): string {
        return this.pondUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getPondName(): string {
        return this.pondName;
    }

    public get getPondCreatedDate(): Date {
        return this.pondCreatedDate;
    }

    public get getPondArea(): number {
        return this.pondArea;
    }

    public get getPondDepth(): number {
        return this.pondDepth;
    }

    public get getCreateCost(): number {
        return this.createCost;
    }

    public get getStatus(): number {
        return this.status;
    }

    public get getImages(): string {
        return this.images;
    }

    public get getPondLatitude(): number {
        return this.pondLatitude;
    }

    public get getPondLongitude(): number {
        return this.pondLongitude;
    }

    public getAll(action, userId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.getAll(this.getQuery(action, userId)).then((pond: any) => {
                resolve(pond);
            });
        });
    }

    getById(action, pondId, userId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.getById(this.getQuery(action, pondId));
        });
    }

    test(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.test().then(res => {
                resolve(res);
            });
        });
    }
}
