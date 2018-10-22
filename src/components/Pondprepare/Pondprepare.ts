import { BaseComponent } from '../baseComponents';
import { PondPrepareServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondPrepare extends BaseComponent {
    private pondPrepareServices: PondPrepareServices;
    private pondPrepareId: number;
    private pondPrepareUUId: string;
    private seasonId: number;
    private pondprepareName: string;
    private notes: string;
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

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setPondprepareName(pondprepareName) {
        this.pondprepareName = pondprepareName;
    }

    public set setNotes(notes) {
        this.notes = notes;
    }

    public setPondprepare(
        pondPrepareId: number,
        pondPrepareUUId: string,
        seasonId: number,
        pondprepareName: string,
        notes: string
    ) {
        this.setPondPrepareId = pondPrepareId;
        this.setPondPrepareUUId = pondPrepareUUId;
        this.setSeasonId = seasonId;
        this.setPondprepareName = pondprepareName;
        this.setNotes = notes;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getPondPrepareUUId(): string {
        return this.pondPrepareUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getPondprepareName(): string {
        return this.pondprepareName;
    }

    public get getNotes(): string {
        return this.notes;
    }

}
