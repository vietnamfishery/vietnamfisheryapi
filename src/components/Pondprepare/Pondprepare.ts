import { BaseComponent } from '../baseComponents';
import { PondPrepareServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondPrepare extends BaseComponent {
    private pondPrepareServices: PondPrepareServices;
    private pondPrepareId: number;
    private pondPrepareUUId: string;
    private seasonAndPondId: number;
    private pondprepareName: string;
    private notes: string;
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

    public set setPondPrepareId(pondPrepareId) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setPondPrepareUUId(pondPrepareUUId) {
        this.pondPrepareUUId = pondPrepareUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setPondprepareName(pondprepareName) {
        this.pondprepareName = pondprepareName;
    }

    public set setNotes(notes) {
        this.notes = notes;
    }

    public set setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy) {
        this.updatedBy = updatedBy;
    }

    public set setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPondprepare(
        pondPrepareId: number,
        pondPrepareUUId: string,
        seasonAndPondId: number,
        pondprepareName: string,
        notes: string,
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
        this.setNotes = notes;
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

    public get getNotes(): string {
        return this.notes;
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
