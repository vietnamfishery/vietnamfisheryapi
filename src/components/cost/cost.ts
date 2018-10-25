import { BaseComponent } from '../baseComponents';
import { CostsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Cost extends BaseComponent {
    private costsServives: CostsServives;
    private costId: number;
    private costUUId: string;
    private pondPrepareId: number;
    private label: string;
    private value: number;
    private responsible: string;
    private notes: string;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.costsServives = new CostsServives();
        this.services = this.costsServives;
    }

    public set setCostId(costId) {
        this.costId = costId;
    }

    public set setCostUUId(costUUId) {
        this.costUUId = costUUId;
    }

    public set setPondPrepareId(pondPrepareId) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setLabel(label) {
        this.label = label;
    }

    public set setValue(value) {
        this.value = value;
    }

    public set setResponsible(responsible) {
        this.responsible = responsible;
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

    public setCost(
            costId: number,
            costUUId: string,
            pondPrepareId: number,
            label: string,
            value: number,
            responsible: string,
            notes: string,
            createdBy?: string,
            createdDate?: Date,
            updatedBy?: string,
            updatedDate?: Date,
            isDeleted?: number
        ) {
            this.setCostId = costId;
            this.setCostUUId = costUUId;
            this.setPondPrepareId = pondPrepareId;
            this.setLabel = label;
            this.setValue = value;
            this.setResponsible = responsible;
            this.setNotes = notes;
            this.setCreatedBy = createdBy;
            this.setCreatedDate = createdDate;
            this.setUpdatedBy = updatedBy;
            this.setUpdatedDate = updatedDate;
            this.setIsDeleted = isDeleted;
    }

    public get getCostId(): number {
        return this.costId;
    }

    public get getCostUUId(): string {
        return this.costUUId;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getLabel(): string {
        return this.label;
    }

    public get getValue(): number {
        return this.value;
    }

    public get getResponsible(): string {
        return this.responsible;
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
