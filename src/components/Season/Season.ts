import { BaseComponent } from '../baseComponents';
import { SeasonServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Season extends BaseComponent {
    private seasonServices: SeasonServices;
    private seasonId: number;
    private seasonUUId: string;
    private userId: number;
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

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setSeasonName(seasonName) {
        this.seasonName = seasonName;
    }

    public setSeason(
        seasonId: number,
        seasonUUId: string,
        userId: number,
        seasonName: string
    ) {
        this.setSeasonId = seasonId;
        this.setSeasonUUId = seasonUUId;
        this.setUserId = userId;
        this.setSeasonName = seasonName;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getSeasonUUId(): string {
        return this.seasonUUId;
    }

    public get getUserId(): number {
        return this.userId;
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
            userId: this.getUserId
        };
    }
}
