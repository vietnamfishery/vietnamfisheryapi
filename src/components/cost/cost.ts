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

    public setCost(costId: number, costUUId: string, pondPrepareId: number, label: string, value: number, responsible: string, notes: string) {
        this.setCostId = costId;
        this.setCostUUId = costUUId;
        this.setPondPrepareId = pondPrepareId;
        this.setLabel = label;
        this.setValue = value;
        this.setResponsible = responsible;
        this.setNotes = notes;
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

}
