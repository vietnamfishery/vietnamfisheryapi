import { BaseComponent } from '../baseComponents';
import { DiedFisherysServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Diedfisherys extends BaseComponent {
    private diedFisherysServives: DiedFisherysServives;
    private diedFisheryId: number;
    private diedFisheryUUId: string;
    private seasonId: number;
    private card: string;
    private quantity: number;
    private solutions: string;
    private employee: string;
    constructor() {
        super();
        this.diedFisherysServives = new DiedFisherysServives();
        this.services = this.diedFisherysServives;
    }

    public set setDiedFisheryId(diedFisheryId) {
        this.diedFisheryId = diedFisheryId;
    }

    public set setDiedFisheryUUId(diedFisheryUUId) {
        this.diedFisheryUUId = diedFisheryUUId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setCard(card) {
        this.card = card;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setSolutions(solutions) {
        this.solutions = solutions;
    }

    public set setEmployee(employee) {
        this.employee = employee;
    }

    public setDiedfisherys(
        diedFisheryId: number,
        diedFisheryUUId: string,
        seasonId: number,
        card: string,
        quantity: number,
        solutions: string,
        employee: string
    ) {
        this.setDiedFisheryId = diedFisheryId;
        this.setDiedFisheryUUId = diedFisheryUUId;
        this.setSeasonId = seasonId;
        this.setCard = card;
        this.setQuantity = quantity;
        this.setSolutions = solutions;
        this.setEmployee = employee;
    }

    public get getDiedFisheryId(): number {
        return this.diedFisheryId;
    }

    public get getDiedFisheryUUId(): string {
        return this.diedFisheryUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getCard(): string {
        return this.card;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getSolutions(): string {
        return this.solutions;
    }

    public get getEmployee(): string {
        return this.employee;
    }

}
