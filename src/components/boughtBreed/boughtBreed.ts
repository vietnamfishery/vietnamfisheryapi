import { BaseComponent } from '../baseComponents';
import { BoughtBreedServives } from '../../services'; // import services
import { Promise } from '../../lib';

export class BoughtBreed extends BaseComponent {
    public boughtBreedServives: BoughtBreedServives;
    private boughtBreedId: number;
    private boughtBreedUUId: string;
    private userId: number;
    private seasonId: number;
    private createdBy: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.boughtBreedServives = new BoughtBreedServives();
        this.services = this.boughtBreedServives;
    }

    public set setBoughtBreedId(boughtBreedId) {
        this.boughtBreedId = boughtBreedId ? boughtBreedId : null;
    }

    public set setBoughtBreedUUId(boughtBreedUUId) {
        this.boughtBreedUUId = boughtBreedUUId;
    }

    public set setUserId(userId) {
        this.userId = userId;
    }
    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setCreatedBy(createdBy) {
        this.createdBy =  createdBy;
    }
    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }
    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setBoughtBreeds(
        boughtBreedId: number,
        boughtBreedUUId: string,
        userId: number,
        seasonId: number,
        createdBy?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setBoughtBreedId = boughtBreedId;
        this.setBoughtBreedUUId = boughtBreedUUId;
        this.setUserId = userId;
        this.setSeasonId = seasonId;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getBoughtBreedId(): number {
        return this.boughtBreedId;
    }

    public get getBoughtBreedUUId(): string {
        return this.boughtBreedUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getCreatedBy(): string {
        return this.createdBy;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
