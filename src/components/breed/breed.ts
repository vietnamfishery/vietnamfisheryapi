import { BaseComponent } from '../baseComponents';
import { BreedServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Breed extends BaseComponent {
    public breedServives: BreedServives;
    private breedId: number;
    private breedUUId: string;
    private ownerId: number;
    private breedName: string;
    private totalQuantity: number;
    private loopOfBreed: number;
    private unit: number;
    private tips: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.breedServives = new BreedServives();
        this.services = this.breedServives;
    }

    public set setBreedId(breedId: number) {
        this.breedId = breedId;
    }

    public set setBreedUUId(breedUUId: string) {
        this.breedUUId = breedUUId;
    }

    public set setOwnerId(userId: number) {
        this.ownerId = userId;
    }

    public set setBreedName(breedName: string) {
        this.breedName = breedName;
    }

    public set setTotalQuantity(totalQuantity: number) {
        this.totalQuantity = totalQuantity;
    }

    public set setUnit(unit: number) {
        this.unit = unit;
    }

    public set setLoopOfBreed(loopOfBreed: number) {
        this.loopOfBreed = loopOfBreed;
    }

    public set setTips(tips: string) {
        this.tips = tips;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setBreed(
        breedId: number,
        breedUUId: string,
        ownerId: number,
        breedName: string,
        totalQuantity: number,
        unit: number,
        loopOfBreed: number,
        tips?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setBreedId = breedId;
        this.setBreedUUId = breedUUId;
        this.setOwnerId = ownerId;
        this.setBreedName = breedName;
        this.setTotalQuantity = totalQuantity;
        this.setUnit = unit;
        this.setLoopOfBreed = loopOfBreed;
        this.setTips = tips;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getBreedId(): number {
        return this.breedId;
    }

    public get getBreedUUId(): string {
        return this.breedUUId;
    }

    public get getOwnerId(): number {
        return this.ownerId;
    }

    public get getBreedName(): string {
        return this.breedName;
    }

    public get getTotalQuantity(): number {
        return this.totalQuantity;
    }

    public get getUnit(): number {
        return this.unit;
    }

    public get getLoopOfBreed(): number {
        return this.loopOfBreed;
    }

    public get getTips(): string {
        return this.tips;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
