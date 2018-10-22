import { BaseComponent } from '../baseComponents';
import { PondDiaryServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondDiary extends BaseComponent {
    private pondDiaryServices: PondDiaryServices;
    private pondDiaryId: number;
    private pondDiaryUUId: string;
    private seasonId: number;
    private pondId: number;
    private fisheryQuantity: number;
    private healthOfFishery: string;
    private pondVolume: number;
    private diedFishery: number;
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

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setPondId(pondId) {
        this.pondId = pondId;
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

    public setPonddiary(
        pondDiaryId: number,
        pondDiaryUUId: string,
        seasonId: number,
        fisheryQuantity: number,
        healthOfFishery: string,
        pondVolume: number,
        diedFishery: number
    ) {
        this.setPondDiaryId = pondDiaryId;
        this.setPondDiaryUUId = pondDiaryUUId;
        this.setSeasonId = seasonId;
        this.setFisheryQuantity = fisheryQuantity;
        this.setHealthOfFishery = healthOfFishery;
        this.setPondVolume = pondVolume;
        this.setDiedFishery = diedFishery;
    }

    public get getPondDiaryId(): number {
        return this.pondDiaryId;
    }

    public get getPondDiaryUUId(): string {
        return this.pondDiaryUUId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
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

    public get getPrimary(): object {
        return {
            pondDiaryId: this.getPondDiaryId
        };
    }

    public get getForgeinKey(): object {
        return {
            pondId: this.getPondId
        };
    }
}
