import { BaseComponent } from '../baseComponents';
import { PondsServices } from '../../services';
import { Promise } from '../../lib';
import { ActionServer, IOptionQuery } from '../../common';
import { merge } from 'lodash';

export class Pond extends BaseComponent {
    private pondsServices: PondsServices;
    private pondId: number;
    private pondUUId: string;
    private userId: number;
    private pondName: string;
    private pondArea: number;
    private pondDepth: number;
    private createCost: number;
    private status: number;
    private images: string;
    private pondLatitude: number = null;
    private pondLongitude: number = null;
    private pondCreatedDate: Date;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondsServices = new PondsServices();
        this.services = this.pondsServices;
        this.primary = {
            pondId: this.getPondId
        };
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

    public set setPondLatitude(val) {
        this.pondLatitude = val;
    }

    public set setPondLongitude(val) {
        this.pondLongitude = val;
    }

    public set setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy) {
        this.updatedBy = updatedBy;
    }

    public set setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPond(
        pondId: string,
        pondUUId: string,
        userId: number,
        pondName: string,
        pondArea: number,
        pondDepth: number,
        createCost: number,
        status: number,
        images?: string,
        pondLatitude?: number,
        pondLongitude?: number,
        pondCreatedDate?: Date,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setPondId = pondId;
        this.setPondUUId = pondUUId;
        this.setUserId = userId;
        this.setPondName = pondName;
        this.setPondArea = pondArea;
        this.setPondDepth = pondDepth;
        this.setCreateCost = createCost;
        this.setStatus = status || status === 0 ? status * 1 : null;
        this.setImages = images;
        this.setPondLatitude = pondLatitude;
        this.setPondLongitude = pondLongitude;
        this.setPondCreatedDate = pondCreatedDate;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
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

    public get getPondCreatedDate(): Date {
        return this.pondCreatedDate;
    }

    public get getCreatedBy(): string {
        return this.createdBy;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getUpdatedBy(): string {
        return this.updatedBy;
    }

    public get getUpdatedDate(): Date {
        return this.updatedDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }

    public get getPrimary(): object {
        return {
            pondId: this.getPondId
        };
    }

    public getAll(action, userId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.getAll(this.getQuery(action, userId)).then((pond: any) => {
                resolve(pond);
            });
        });
    }

    createQuery(options: IOptionQuery) {
        switch (options.action) {
            case ActionServer.GET:
                return merge(super.createQuery(options),{
                    // where: this.getForgeinKey
                },{
                    where: this.getPrimary
                });
            default:
                return super.createQuery(options);
        }
    }

    // getById(action, pondId, userId): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.pondsServices.getById(this.getQuery(action, pondId));
    //     });
    // }

    test(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pondsServices.test().then(res => {
                resolve(res);
            });
        });
    }
}
