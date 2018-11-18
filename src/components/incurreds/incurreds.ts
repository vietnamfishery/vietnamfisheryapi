import { BaseComponent } from '../baseComponents';
import { IncurredsServices } from '../../services';

export class Incurred extends BaseComponent {
    public incurredsServices: IncurredsServices;
    private incurredId: number;
    private incurredUUId: string;
    private pondPrepareId: number;
    private incurredName: string;
    private value: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.incurredsServices = new IncurredsServices();
        this.services = this.incurredsServices;
    }

    public set setIncurredId(incurredId: number) {
        this.incurredId = incurredId;
    }

    public set setIncurredUUId(incurredUUId: string) {
        this.incurredUUId = incurredUUId;
    }

    public set setPondPrepareId(pondPrepareId: number) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setIncurredName(incurredName: string) {
        this.incurredName = incurredName;
    }

    public set setValue(value: number) {
        this.value = value;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setIncurred(
        incurredId: number,
        incurredUUId: string,
        pondPrepareId: number,
        incurredName: string,
        value: number,
        createdDate?: Date,
        isDeleted?: number,
    ) {
        this.setIncurredId = incurredId;
        this.setIncurredUUId = incurredUUId;
        this.setPondPrepareId = pondPrepareId;
        this.setIncurredName = incurredName;
        this.setValue = value;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getIncurredId(): number {
        return this.incurredId;
    }

    public get getIncurredUUId(): string {
        return this.incurredUUId;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getIncurredName(): string {
        return this.incurredName;
    }

    public get getValue(): number {
        return this.value;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
