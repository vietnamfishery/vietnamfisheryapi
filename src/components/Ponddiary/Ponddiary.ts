import { BaseComponent } from '../baseComponents';
import { PondDiaryServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondDiary extends BaseComponent {
    public pondDiaryServices: PondDiaryServices;
    private pondDiaryId: number;
    private pondDiaryUUId: string;
    private seasonAndPondId: number;
    private fisheryQuantity: number;
    private healthOfFishery: string;
    private pondVolume: number;
    private diedFishery: number;
    private notes: string;
    private createdBy?: string;
    private createdDate?: Date;
    private updatedBy?: string;
    private updatedDate?: Date;
    private isDeleted?: number;
    constructor() {
        super();
        this.pondDiaryServices = new PondDiaryServices();
        this.services = this.pondDiaryServices;
    }

    public set setPondDiaryId(pondDiaryId) {
        this.pondDiaryId = pondDiaryId;
    }

    public set setPondDiaryUUId(pondDiaryUUId) {
        this.pondDiaryUUId = pondDiaryUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setFisheryQuantity(fisheryQuantity) {
        this.fisheryQuantity = fisheryQuantity;
    }

    public set setHealthOfFishery(healthOfFishery) {
        this.healthOfFishery = healthOfFishery;
    }

    public set setPondVolume(pondVolume) {
        this.pondVolume = pondVolume;
    }

    public set setDiedFishery(diedFishery) {
        this.diedFishery = diedFishery;
    }

    public set setNotes(notes) {
        this.notes = notes;
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

    public setPonddiary(
        pondDiaryId: number,
        pondDiaryUUId: string,
        seasonAndPondId: number,
        fisheryQuantity: number,
        healthOfFishery: string,
        pondVolume: number,
        diedFishery: number,
        notes: string,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setPondDiaryId = pondDiaryId;
        this.setPondDiaryUUId = pondDiaryUUId;
        this.setSeasonAndPondId= seasonAndPondId;
        this.setFisheryQuantity = fisheryQuantity;
        this.setHealthOfFishery = healthOfFishery;
        this.setPondVolume = pondVolume;
        this.setDiedFishery = diedFishery;
        this.setNotes = notes;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondDiaryId(): number {
        return this.pondDiaryId;
    }

    public get getPondDiaryUUId(): string {
        return this.pondDiaryUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getFisheryQuantity(): number {
        return this.fisheryQuantity;
    }

    public get getHealthOfFishery(): string {
        return this.healthOfFishery;
    }

    public get getPondVolume(): number {
        return this.pondVolume;
    }

    public get getDiedFishery(): number {
        return this.diedFishery;
    }

    public get getNotes(): string {
        return this.notes;
    }

    public get getPrimary(): object {
        return {
            pondDiaryId: this.getPondDiaryId
        };
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

    // public get getForgeinKey(): object {
    //     return {
    //         pondId: this.getPondId,
    //         seasonId: this.getSeasonId
    //     };
    // }
}
