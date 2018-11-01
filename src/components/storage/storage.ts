import { BaseComponent } from '../baseComponents';
import { StoregeServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Storage extends BaseComponent {
    public storegeServices: StoregeServices;
    private storageId: number;
    private storageUUId: string;
    private ownerId: number;
    private productName: string;
    private quantityStorages: number;
    private unit: number;
    private type: number;
    private descriptions: string;
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

    public set setOwnerId(userId: number) {
        this.ownerId = userId;
    }

    public set setProductName(productName) {
        this.productName = productName;
    }

    public set setQuantityStorages(quantityStorages) {
        this.quantityStorages = quantityStorages;
    }

    public set setUnit(unit) {
        this.unit = unit;
    }

    public set setType(type) {
        this.type = type;
    }

    public set setDescriptions(descriptions) {
        this.descriptions = descriptions;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setStorages(
        storageId: number,
        storageUUId: string,
        ownerId: number,
        productName: string,
        quantityStorages: number,
        unit: number,
        type: number,
        descriptions: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setStorageId = storageId;
        this.setStorageUUId = storageUUId;
        this.setOwnerId = ownerId;
        this.setProductName = productName;
        this.setQuantityStorages = quantityStorages;
        this.setUnit = unit;
        this.setType = type;
        this.setDescriptions = descriptions;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getStorageUUId(): string {
        return this.storageUUId;
    }

    public get getOwnerId(): number {
        return this.ownerId;
    }

    public get getProductName(): string {
        return this.productName;
    }

    public get getQuantityStorages(): number {
        return this.quantityStorages;
    }

    public get getUnit(): number {
        return this.unit;
    }

    public get getType(): number {
        return this.type;
    }

    public get getDescriptions(): string {
        return this.descriptions;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
