import { BaseComponent } from '../baseComponents';
import { SeasonServices } from '../../services'; // import services

export class Season extends BaseComponent {
    public seasonServices: SeasonServices;
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

    public set setSeasonId(seasonId: number) {
        this.seasonId = seasonId;
    }

    public set setSeasonUUId(seasonUUId: string) {
        this.seasonUUId = seasonUUId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setSeasonName(seasonName: string) {
        this.seasonName = seasonName;
    }

    public set setStatus(status: number) {
        this.status = status;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
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
}
