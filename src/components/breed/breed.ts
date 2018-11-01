import { BaseComponent } from '../baseComponents';
import { BreedServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Breed extends BaseComponent {
    public breedServives: BreedServives;
    private breedId: number;
    private breedUUId: string;
    private breedName: string;
    private loopOfBreed: number;
    private testingAgency: string;
    private descriptions: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.breedServives = new BreedServives();
        this.services = this.breedServives;
    }

    public set setBreedId(breedId) {
        this.breedId = breedId;
    }

    public set setBreedUUId(breedUUId) {
        this.breedUUId = breedUUId;
    }

    public set setBreedName(breedName) {
        this.breedName = breedName;
    }

    public set setLoopOfBreed(loopOfBreed) {
        this.loopOfBreed = loopOfBreed;
    }

    public set setTestingAgency(testingAgency) {
        this.testingAgency = testingAgency;
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

    public setBreed(
        breedId: number,
        breedUUId: string,
        breedName: string,
        loopOfBreed: number,
        testingAgency: string,
        descriptions: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setBreedId = breedId;
        this.setBreedUUId = breedUUId;
        this.setBreedName = breedName;
        this.setLoopOfBreed = loopOfBreed;
        this.setTestingAgency = testingAgency;
        this.setDescriptions = descriptions;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getBreedId(): number {
        return this.breedId;
    }

    public get getBreedUUId(): string {
        return this.breedUUId;
    }

    public get getBreedName(): string {
        return this.breedName;
    }

    public get getLoopOfBreed(): number {
        return this.loopOfBreed;
    }

    public get getTestingAgency(): string {
        return this.testingAgency;
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
