import { BaseComponent } from '../baseComponents';
import { StoregeServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Storage extends BaseComponent {
    private storegeServices: StoregeServices;
    private storageId: number;
    private storageUUId: string;
    private materialId: number;
    private seasonId: number;
    private quantityStorages: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.storegeServices = new StoregeServices();
        this.services = this.storegeServices;
    }

    public set setStorageId(storageId) {
        this.storageId = storageId;
    }

    public set setStorageUUId(storageUUId) {
        this.storageUUId = storageUUId;
    }

    public set setMaterialId(materialId) {
        this.materialId = materialId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setQuantityStorages(quantityStorages) {
        this.quantityStorages = quantityStorages;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setStorages(storageId: number, storageUUId: string, materialId: number, seasonId: number, quantityStorages: number, createdDate?: Date, isDeleted?: number) {
        this.setStorageId = storageId;
        this.setStorageUUId = storageUUId;
        this.setMaterialId = materialId;
        this.setSeasonId = seasonId;
        this.setQuantityStorages = quantityStorages;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getStorageUUId(): string {
        return this.storageUUId;
    }

    public get getMaterialId(): number {
        return this.materialId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getQuantityStorages(): number {
        return this.quantityStorages;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
