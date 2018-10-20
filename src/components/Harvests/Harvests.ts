import { BaseComponent } from '../baseComponents';
import { HarvestsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Harvests extends BaseComponent {
    private harvestsServives: HarvestsServives;
    private harvestId: number;
    private harvestUUId: string;
    private seasonId: number;
    private harvestName: string;
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

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setHarvestName(harvestName) {
        this.harvestName = harvestName;
    }

    public setHarvests(harvestId: number, harvestUUId: string, seasonId: number, harvestName: string) {
        this.setHarvestId = harvestId;
        this.setHarvestUUId = harvestUUId;
        this.setSeasonId = seasonId;
        this.setHarvestName = harvestName;
    }

    public get getHarvestId(): number {
        return this.harvestId;
    }

    public get getHarvestUUId(): string {
        return this.harvestUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getHarvestName(): string {
        return this.harvestName;
    }

}
