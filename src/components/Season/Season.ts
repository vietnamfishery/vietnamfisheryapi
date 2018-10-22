import { BaseComponent } from '../baseComponents';
import { SeasonServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Season extends BaseComponent {
    private seasonServices: SeasonServices;
    private seasonId: number;
    private seasonUUId: string;
    private pondId: number;
    private seasonName: string;
    constructor() {
        super();
        this.seasonServices = new SeasonServices();
        this.services = this.seasonServices;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setSeasonUUId(seasonUUId) {
        this.seasonUUId = seasonUUId;
    }

    public set setPondId(pondId) {
        this.pondId = pondId;
    }

    public set setSeasonName(seasonName) {
        this.seasonName = seasonName;
    }

    public setSeason(
        seasonId: number,
        seasonUUId: string,
        pondId: number,
        seasonName: string
    ) {
        this.setSeasonId = seasonId;
        this.setSeasonUUId = seasonUUId;
        this.setPondId = pondId;
        this.setSeasonName = seasonName;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getSeasonUUId(): string {
        return this.seasonUUId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getSeasonName(): string {
        return this.seasonName;
    }

    public get getPrimary(): any {
        return {
            seasonId: this.getSeasonId
        };
    }

    public get getForeignKey(): any {
        return {
            pondId: this.getPondId
        };
    }
}
