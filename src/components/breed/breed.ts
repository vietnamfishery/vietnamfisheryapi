import { BaseComponent } from '../baseComponents';
import { BreedServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Breed extends BaseComponent {
    private breedServives: BreedServives;
    private breedId: number;
    private breedUUId: string;
    private breedName: string;
    private loopOfBreed: number;
    private testingAgency: string;
    private descriptions: string;
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

    public setBreed(
        breedId: number,
        breedUUId: string,
        breedName: string,
        loopOfBreed: number,
        testingAgency: string,
        descriptions: string
    ) {
        this.setBreedId = breedId;
        this.setBreedUUId = breedUUId;
        this.setBreedName = breedName;
        this.setLoopOfBreed = loopOfBreed;
        this.setTestingAgency = testingAgency;
        this.setDescriptions = descriptions;
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
}
