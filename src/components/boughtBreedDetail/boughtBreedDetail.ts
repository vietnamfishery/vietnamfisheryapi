import { BaseComponent } from '../baseComponents';
import { BoughtBreedDetailsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class BoughtBreedDetail extends BaseComponent {
    private boughtBreedDetailsServives: BoughtBreedDetailsServives;
    private boughtBreedDetailUUId: string;
    private boughtBreedId: number;
    private quantity: number;
    private unitPrice: number;
    private soldAddress: string;
    private notes: string;
    private isDeleted: number;
    constructor() {
        super();
        this.boughtBreedDetailsServives = new BoughtBreedDetailsServives();
        this.services = this.boughtBreedDetailsServives;
    }

    public set setBoughtBreedDetailUUId(boughtBreedDetailUUId) {
        this.boughtBreedDetailUUId = boughtBreedDetailUUId;
    }

    public set setBoughtBreedId(boughtBreedId) {
        this.boughtBreedId = boughtBreedId;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }

    public set setSoldAddress(soldAddress) {
        this.soldAddress = soldAddress;
    }

    public set setNotes(notes) {
        this.notes = notes;
    }
    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setBoughtBreedDetails(
        boughtBreedDetailUUId: string,
        boughtBreedId: number,
        quantity: number,
        unitPrice: number,
        soldAddress: string,
        notes: string,
        isDeleted?: number
    ) {
        this.setBoughtBreedDetailUUId = boughtBreedDetailUUId;
        this.setBoughtBreedId = boughtBreedId;
        this.setQuantity = quantity;
        this.setUnitPrice = unitPrice;
        this.setSoldAddress = soldAddress;
        this.setNotes = notes;
        this.setIsDeleted = isDeleted;
    }

    public get getBoughtBreedDetailUUId(): string {
        return this.boughtBreedDetailUUId;
    }

    public get getBoughtBreedId(): number {
        return this.boughtBreedId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getUnitPrice(): number {
        return this.unitPrice;
    }

    public get getSoldAddress(): string {
        return this.soldAddress;
    }

    public get getNotes(): string {
        return this.notes;
    }
    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
