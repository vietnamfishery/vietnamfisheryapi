import { BaseComponent } from '../baseComponents';
import { TakeCareServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Takecare extends BaseComponent {
    private takeCareServices: TakeCareServices;
    private takeCareId: number;
    private takeCareUUId: string;
    private seasonId: number;
    private takeCareName: string;
    private takeType: number;
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

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setTakeCareName(takeCareName) {
        this.takeCareName = takeCareName;
    }

    public set setTakeType(takeType) {
        this.takeType = takeType;
    }

    public setTakecare(takeCareId: number, takeCareUUId: string, seasonId: number, takeCareName: string, takeType: number) {
        this.setTakeCareId = takeCareId;
        this.setTakeCareUUId = takeCareUUId;
        this.setSeasonId = seasonId;
        this.setTakeCareName = takeCareName;
        this.setTakeType = takeType;
    }

    public get getTakeCareId(): number {
        return this.takeCareId;
    }

    public get getTakeCareUUId(): string {
        return this.takeCareUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getTakeCareName(): string {
        return this.takeCareName;
    }

    public get getTakeType(): number {
        return this.takeType;
    }
}
