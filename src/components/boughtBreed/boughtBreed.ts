import { BaseComponent } from '../baseComponents';
import { BoughtBreedServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class BoughtBreed extends BaseComponent {
    private boughtBreedServives: BoughtBreedServives;
    private boughtBreedId: number;
    private boughtBreedUUId: string;
    private breedId: number;
    private seasonId: number;
    private quantityStorages: number;
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

    public set setBreedId(breedId) {
        this.breedId = breedId;
    }
    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }
    public set setQuantityStorages(quantityStorages) {
        this.quantityStorages = quantityStorages;
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
        breedId: number,
        seasonId: number,
        quantityStorages: number,
        createdBy?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setBoughtBreedId = boughtBreedId;
        this.setBoughtBreedUUId = boughtBreedUUId;
        this.setBreedId = breedId;
        this.setSeasonId = seasonId;
        this.setQuantityStorages = quantityStorages;
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

    public get getBreedId(): number {
        return this.breedId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getQuantityStorages(): number {
        return this.quantityStorages;
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
