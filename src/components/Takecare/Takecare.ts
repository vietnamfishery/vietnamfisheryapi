import { BaseComponent } from '../baseComponents';
import { TakeCareServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class TakeCare extends BaseComponent {
    private takeCareServices: TakeCareServices;
    private takeCareId: number;
    private takeCareUUId: string;
    private seasonAndPondId: number;
    private takeCareName: string;
    private takeType: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.takeCareServices = new TakeCareServices();
        this.services = this.takeCareServices;
    }

    public set setTakeCareId(takeCareId) {
        this.takeCareId = takeCareId;
    }

    public set setTakeCareUUId(takeCareUUId) {
        this.takeCareUUId = takeCareUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setTakeCareName(takeCareName) {
        this.takeCareName = takeCareName;
    }

    public set setTakeType(takeType) {
        this.takeType = takeType;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setTakecare(takeCareId: number, takeCareUUId: string, seasonAndPondId: number, takeCareName: string, takeType: number, createdDate?: Date, isDeleted?: number) {
        this.setTakeCareId = takeCareId;
        this.setTakeCareUUId = takeCareUUId;
        this.setSeasonAndPondId= seasonAndPondId;
        this.setTakeCareName = takeCareName;
        this.setTakeType = takeType;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getTakeCareId(): number {
        return this.takeCareId;
    }

    public get getTakeCareUUId(): string {
        return this.takeCareUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getTakeCareName(): string {
        return this.takeCareName;
    }

    public get getTakeType(): number {
        return this.takeType;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
