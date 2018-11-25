import { BaseComponent } from '../baseComponents';
import { BoughtBreedDetailsServives } from '../../services'; // import services

export class BoughtBreedDetail extends BaseComponent {
    public boughtBreedDetailsServives: BoughtBreedDetailsServives;
    private boughtBreedDetailId: number;
    private boughtBreedDetailUUId: string;
    private couponId: number;
    private breedId: number;
    private quantity: number;
    private unit: number;
    private unitPrice: number;
    private soldAddress: string;
    private testingAgency: string;
    private descriptions: string;
    private isDeleted: number;
    constructor() {
        super();
        this.boughtBreedDetailsServives = new BoughtBreedDetailsServives();
        this.services = this.boughtBreedDetailsServives;
    }

    public set setBoughtBreedDetailId(boughtBreedDetailId: number) {
        this.boughtBreedDetailId = boughtBreedDetailId;
    }

    public set setBoughtBreedDetailUUId(boughtBreedDetailUUId: string) {
        this.boughtBreedDetailUUId = boughtBreedDetailUUId;
    }

    public set setCouponId(couponId: number) {
        this.couponId = couponId;
    }

    public set setBreedId(breedId: number) {
        this.breedId = breedId;
    }

    public set setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    public set setUnit(unit: number) {
        this.unit = unit;
    }

    public set setUnitPrice(unitPrice: number) {
        this.unitPrice = unitPrice;
    }

    public set setSoldAddress(soldAddress: string) {
        this.soldAddress = soldAddress;
    }

    public set setTestingAgency(testingAgency: string) {
        this.testingAgency = testingAgency;
    }

    public set setDescriptions(descriptions: string) {
        this.descriptions = descriptions;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setBoughtBreedDetails(
        boughtBreedDetailId: number,
        boughtBreedDetailUUId: string,
        couponId: number,
        breedId: number,
        quantity: number,
        unit: number,
        unitPrice: number,
        soldAddress?: string,
        testingAgency?: string,
        descriptions?: string,
        isDeleted?: number,
    ) {
        this.setBoughtBreedDetailId = boughtBreedDetailId;
        this.setBoughtBreedDetailUUId = boughtBreedDetailUUId;
        this.setCouponId = couponId;
        this.setBreedId = breedId;
        this.setQuantity = quantity;
        this.setUnit = unit;
        this.setUnitPrice = unitPrice;
        this.setSoldAddress = soldAddress;
        this.setTestingAgency = testingAgency;
        this.setDescriptions = descriptions;
        this.setIsDeleted = isDeleted;
    }

    public get getBoughtBreedDetailId(): number {
        return this.boughtBreedDetailId;
    }

    public get getBoughtBreedDetailUUId(): string {
        return this.boughtBreedDetailUUId;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getBreedId(): number {
        return this.breedId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getUnit(): number {
        return this.unit;
    }

    public get getUnitPrice(): number {
        return this.unitPrice;
    }

    public get getSoldAddress(): string {
        return this.soldAddress;
    }

    public get getTestingAgency(): string {
        return this.testingAgency;
    }

    public get getDescriptions(): string {
        return this.descriptions;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
