import { BaseComponent } from '../baseComponents';
import { PondPrepareServices } from '../../services'; // import services

export class PondPrepare extends BaseComponent {
    public pondPrepareServices: PondPrepareServices;
    private pondPrepareId: number;
    private pondPrepareUUId: string;
    private seasonAndPondId: number;
    private pondprepareName: string;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondPrepareServices = new PondPrepareServices();
        this.services = this.pondPrepareServices;
    }

    public set setPondPrepareId(pondPrepareId: number) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setPondPrepareUUId(pondPrepareUUId: string) {
        this.pondPrepareUUId = pondPrepareUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId: number) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setPondprepareName(pondprepareName: string) {
        this.pondprepareName = pondprepareName;
    }

    public set setCreatedBy(createdBy: string) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public set setUpdatedDate(updatedDate: Date) {
        this.updatedDate = updatedDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setPondprepare(
        pondPrepareId: number,
        pondPrepareUUId: string,
        seasonAndPondId: number,
        pondprepareName: string,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setPondPrepareId = pondPrepareId;
        this.setPondPrepareUUId = pondPrepareUUId;
        this.setSeasonAndPondId = seasonAndPondId;
        this.setPondprepareName = pondprepareName;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getPondPrepareUUId(): string {
        return this.pondPrepareUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getPondprepareName(): string {
        return this.pondprepareName;
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
