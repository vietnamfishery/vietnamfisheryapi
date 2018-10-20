import { BaseComponent } from '../baseComponents';
import { HarvestDetailsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Harvestdetails extends BaseComponent {
    private harvestDetailsServives: HarvestDetailsServives;
    private harvestDetailUUId: string;
    private harvestId: number;
    private breedName: string;
    private quantity: number;
    private unitPrice: number;
    constructor() {
        super();
        this.harvestDetailsServives = new HarvestDetailsServives();
        this.services = this.harvestDetailsServives;
    }

    public set setHarvestIdDetailUUId(harvestIdDetailUUId) {
        this.harvestDetailUUId = harvestIdDetailUUId;
    }

    public set setHarvestId(harvestId) {
        this.harvestId = harvestId;
    }

    public set setBreedName(breedName) {
        this.breedName = breedName;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }

    public setHarvestdetails(
        harvestIdDetailUUId: string,
        harvestId: number,
        breedName: string,
        quantity: number,
        unitPrice: number
    ) {
        this.setHarvestIdDetailUUId = harvestIdDetailUUId;
        this.setHarvestId = harvestId;
        this.setBreedName = breedName;
        this.setQuantity = quantity;
        this.setUnitPrice = unitPrice;
    }

    public get getHarvestDetailUUId(): string {
        return this.harvestDetailUUId;
    }

    public get getHarvestId(): number {
        return this.harvestId;
    }

    public get getBreedName(): string {
        return this.breedName;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getUnitPrice(): number {
        return this.unitPrice;
    }

}
