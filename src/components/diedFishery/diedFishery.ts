import { BaseComponent } from '../baseComponents';
import { DiedFisherysServives } from '../../services'; // import services

export class DiedFishery extends BaseComponent {
    public diedFisherysServives: DiedFisherysServives;
    private diedFisheryId: number;
    private diedFisheryUUId: string;
    private seasonAndPondId: number;
    private card: number;
    private quantity: number;
    private solutions: string;
    private employee: string;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.diedFisherysServives = new DiedFisherysServives();
        this.services = this.diedFisherysServives;
    }

    public set setDiedFisheryId(diedFisheryId: number) {
        this.diedFisheryId = diedFisheryId;
    }

    public set setDiedFisheryUUId(diedFisheryUUId: string) {
        this.diedFisheryUUId = diedFisheryUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId: number) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setCard(card: number) {
        this.card = card;
    }

    public set setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    public set setSolutions(solutions: string) {
        this.solutions = solutions;
    }

    public set setEmployee(employee: string) {
        this.employee = employee;
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

    public setDiedfisherys(
        diedFisheryId: number,
        diedFisheryUUId: string,
        seasonAndPondId: number,
        card: number,
        quantity: number,
        solutions?: string,
        employee?: string,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setDiedFisheryId = diedFisheryId;
        this.setDiedFisheryUUId = diedFisheryUUId;
        this.setSeasonAndPondId = seasonAndPondId;
        this.setCard = card;
        this.setQuantity = quantity;
        this.setSolutions = solutions;
        this.setEmployee = employee;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getDiedFisheryId(): number {
        return this.diedFisheryId;
    }

    public get getDiedFisheryUUId(): string {
        return this.diedFisheryUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getCard(): number {
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
