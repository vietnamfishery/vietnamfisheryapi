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
    private status: number;
    private createdDate: Date;
    private isDeleted: number;

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

    public set setStatus(status) {
        this.status = status;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setSeason(
        seasonId: number,
        seasonUUId: string,
        userId: number,
        seasonName: string,
        status: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setSeasonId = seasonId;
        this.setSeasonUUId = seasonUUId;
        this.setUserId = userId;
        this.setSeasonName = seasonName;
        this.setStatus = status;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
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

    public get getStatus(): number {
        return this.status;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }

    public get getPrimary(): any {
        return {
            seasonId: this.seasonId
        };
    }

    public get getStatus(): number {
        return this.status;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
