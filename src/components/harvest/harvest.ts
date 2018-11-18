import { BaseComponent } from '../baseComponents';
import { HarvestsServives } from '../../services'; // import services

export class Harvest extends BaseComponent {
    public harvestsServives: HarvestsServives;
    private harvestId: number;
    private harvestUUId: string;
    private seasonAndPondId: number;
    private harvestName: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.harvestsServives = new HarvestsServives();
        this.services = this.harvestsServives;
    }

    public set setHarvestId(harvestId) {
        this.harvestId = harvestId;
    }

    public set setHarvestUUId(harvestUUId) {
        this.harvestUUId = harvestUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setHarvestName(harvestName) {
        this.harvestName = harvestName;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setHarvests(
        harvestId: number,
        harvestUUId: string,
        seasonAndPondId: number,
        harvestName: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setHarvestId = harvestId;
        this.setHarvestUUId = harvestUUId;
        this.setSeasonAndPondId = seasonAndPondId;
        this.setHarvestName = harvestName;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getHarvestId(): number {
        return this.harvestId;
    }

    public get getHarvestUUId(): string {
        return this.harvestUUId;
    }

    public get getsetSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getHarvestName(): string {
        return this.harvestName;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
