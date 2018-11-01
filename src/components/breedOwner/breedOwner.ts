import { BaseComponent } from '../baseComponents';
import { BreedOwnwerServices } from '../../services'; // import services
import { Promise } from '../../lib';

export class OwnerBreed extends BaseComponent {
    public breedOwnwerServices: BreedOwnwerServices;
    private ownerId: number;
    private userId: number;
    private isDeleted: number;
    constructor() {
        super();
        this.breedOwnwerServices = new BreedOwnwerServices();
        this.services = this.breedOwnwerServices;
    }

    public set setOwnerId(ownerId: number) {
        this.ownerId = ownerId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setOwnerBreed(
        ownerId: number,
        userId: number,
        isDeleted?: number
    ) {
        this.setOwnerId = ownerId;
        this.setUserId = userId;
        this.setIsDeleted = isDeleted;
    }

    public get getOwnerId(): number {
        return this.ownerId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
