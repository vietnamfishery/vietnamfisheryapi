import { BaseComponent } from '../baseComponents';
import { GrowthsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Growth extends BaseComponent {
    private growthsServives: GrowthsServives;
    private growthId: number;
    private growthUUId: string;
    private seasonAndPondId: number;
    private averageDensity: number;
    private averageMass: number;
    private speedOdGrowth: number;
    private livingRatio: number;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
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

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
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

    public setGrowths(
        growthId: number,
        growthUUId: string,
        seasonAndPondId: number,
        averageDensity: number,
        averageMass: number,
        speedOdGrowth: number,
        livingRatio: number,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setGrowthId = growthId;
        this.setGrowthUUId = growthUUId;
        this.seasonAndPondId = seasonAndPondId;
        this.setAverageDensity = averageDensity;
        this.setAverageMass = averageMass;
        this.setSpeedOdGrowth = speedOdGrowth;
        this.setLivingRatio = livingRatio;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getGrowthId(): number {
        return this.growthId;
    }

    public get getGrowthUUId(): string {
        return this.growthUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
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
}
