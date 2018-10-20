import { BaseComponent } from '../baseComponents';
import { BoughtBreedDetailsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class BoughtBreedDetails extends BaseComponent {
    private boughtBreedDetailsServives: BoughtBreedDetailsServives;
    private boughtBreedDetailUUId: string;
    private boughtBreedId: number;
    private breedId: number;
    private quantity: number;
    private unitPrice: number;
    private soldAddress: string;
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

    public set setBreedId(breedId) {
        this.breedId = breedId;
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

    public setBoughtBreedDetails(
        boughtBreedDetailUUId: string,
        boughtBreedId: number,
        breedId: number,
        quantity: number,
        unitPrice: number,
        soldAddress: string
    ) {
        this.setBoughtBreedDetailUUId = boughtBreedDetailUUId;
        this.setBoughtBreedId = boughtBreedId;
        this.setBreedId = breedId;
        this.setQuantity = quantity;
        this.setUnitPrice = unitPrice;
        this.setSoldAddress = soldAddress;
    }

    public get getBoughtBreedDetailUUId(): string {
        return this.boughtBreedDetailUUId;
    }

    public get getBoughtBreedId(): number {
        return this.boughtBreedId;
    }

    public get getBreedId(): number {
        return this.breedId;
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
}
