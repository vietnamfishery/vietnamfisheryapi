import { BaseComponent } from '../baseComponents';
import { StoregeOwnwerServices } from '../../services'; // import services
import { Promise } from '../../lib';

export class Storage extends BaseComponent {
    public storegeOwnwerServices: StoregeOwnwerServices;
    private storageOwnerId: number;
    private userId: number;
    private isDeleted: number;
    constructor() {
        super();
        this.storegeOwnwerServices = new StoregeOwnwerServices();
        this.services = this.storegeOwnwerServices;
    }

    public set setStorageOwnerId(storageOwnerId: number) {
        this.storageOwnerId = storageOwnerId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setStorages(
        storageOwnerId: number,
        userId: number,
        isDeleted?: number
    ) {
        this.setStorageOwnerId = storageOwnerId;
        this.setUserId = userId;
        this.setIsDeleted = isDeleted;
    }

    public get getStorageOwnerId(): number {
        return this.storageOwnerId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
