import { BaseComponent } from '../baseComponents';
import { GrowthsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Growths extends BaseComponent {
    private growthsServives: GrowthsServives;
    private growthId: number;
    private growthUUId: string;
    private seasonId: number;
    private averageDensity: number;
    private averageMass: number;
    private speedOdGrowth: number;
    private livingRatio: number;
    constructor() {
        super();
        this.growthsServives = new GrowthsServives();
        this.services = this.growthsServives;
    }

    public set setGrowthId(growthId) {
        this.growthId = growthId;
    }

    public set setGrowthUUId(growthUUId) {
        this.growthUUId = growthUUId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setAverageDensity(averageDensity) {
        this.averageDensity = averageDensity;
    }

    public set setAverageMass(averageMass) {
        this.averageMass = averageMass;
    }

    public set setSpeedOdGrowth(speedOdGrowth) {
        this.speedOdGrowth = speedOdGrowth;
    }

    public set setLivingRatio(livingRatio) {
        this.livingRatio = livingRatio;
    }

    public setGrowths(
        growthId: number,
        growthUUId: string,
        seasonId: number,
        averageDensity: number,
        averageMass: number,
        speedOdGrowth: number,
        livingRatio: number
    ) {
        this.setGrowthId = growthId;
        this.setGrowthUUId = growthUUId;
        this.setSeasonId = seasonId;
        this.setAverageDensity = averageDensity;
        this.setAverageMass = averageMass;
        this.setSpeedOdGrowth = speedOdGrowth;
        this.setLivingRatio = livingRatio;
    }

    public get getGrowthId(): number {
        return this.growthId;
    }

    public get getGrowthUUId(): string {
        return this.growthUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getAverageDensity(): number {
        return this.averageDensity;
    }

    public get getAverageMass(): number {
        return this.averageMass;
    }

    public get getSpeedOdGrowth(): number {
        return this.speedOdGrowth;
    }

    public get getLivingRatio(): number {
        return this.livingRatio;
    }

}
