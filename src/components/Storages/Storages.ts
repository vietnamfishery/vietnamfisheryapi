import { BaseComponent } from '../baseComponents';
import { StoregeServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Storages extends BaseComponent {
    private storegeServices: StoregeServices;
    private storageId: number;
    private storageUUId: string;
    private userId: number;
    private unitName: string;
    private unitType: number;
    private description: string;
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

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setUnitName(unitName) {
        this.unitName = unitName;
    }

    public set setUnitType(unitType) {
        this.unitType = unitType;
    }

    public set setDescription(description) {
        this.description = description;
    }

    public setStorages(storageId: number, storageUUId: string, userId: number, unitName: string, unitType: number, description: string) {
        this.setStorageId = storageId;
        this.setStorageUUId = storageUUId;
        this.setUserId = userId;
        this.setUnitName = unitName;
        this.setUnitType = unitType;
        this.setDescription = description;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getStorageUUId(): string {
        return this.storageUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getUnitName(): string {
        return this.unitName;
    }

    public get getUnitType(): number {
        return this.unitType;
    }

    public get getDescription(): string {
        return this.description;
    }
}
