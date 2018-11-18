import { BaseComponent } from '../baseComponents';
import { HarvestDetailsServives } from '../../services'; // import services

export class HarvestDetail extends BaseComponent {
    public harvestDetailsServives: HarvestDetailsServives;
    private harvestDetailUUId: string;
    private harvestId: number;
    private quantity: number;
    private unitPrice: number;
    private isDeleted: number;
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

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setHarvestdetails(
        harvestIdDetailUUId: string,
        harvestId: number,
        quantity: number,
        unitPrice: number,
        isDeleted?: number
    ) {
        this.setHarvestIdDetailUUId = harvestIdDetailUUId;
        this.setHarvestId = harvestId;
        this.setQuantity = quantity;
        this.setUnitPrice = unitPrice;
        this.setIsDeleted = isDeleted;
    }

    public get getHarvestDetailUUId(): string {
        return this.harvestDetailUUId;
    }

    public get getHarvestId(): number {
        return this.harvestId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getUnitPrice(): number {
        return this.unitPrice;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
