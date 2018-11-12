import { BaseComponent } from '../baseComponents';
import { BoughtBreedDetailsServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class BoughtBreedDetail extends BaseComponent {
    public boughtBreedDetailsServives: BoughtBreedDetailsServives;
    private boughtBreedDetailId: number;
    private boughtBreedDetailUUId: string;
    private boughtBreedId: number;
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

    public set setBoughtBreedDetailId(boughtBreedDetailId) {
        this.boughtBreedDetailId = boughtBreedDetailId;
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

    public set setUnit(unit) {
        this.unit = unit;
    }

    public set setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }

    public set setSoldAddress(soldAddress) {
        this.soldAddress = soldAddress;
    }

    public set setTestingAgency(testingAgency) {
        this.testingAgency = testingAgency;
    }

    public set setDescriptions(descriptions) {
        this.descriptions = descriptions;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setBoughtBreedDetails(
        boughtBreedDetailId: number,
        boughtBreedDetailUUId: string,
        boughtBreedId: number,
        breedId: number,
        quantity: number,
        unit: number,
        unitPrice: number,
        loopOfBreed: number,
        soldAddress?: string,
        testingAgency?: string,
        descriptions?: string,
        isDeleted?: number,
    ) {
        this.setBoughtBreedDetailId = boughtBreedDetailId;
        this.setBoughtBreedDetailUUId = boughtBreedDetailUUId;
        this.setBoughtBreedId = boughtBreedId;
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

    public get getBoughtBreedId(): number {
        return this.boughtBreedId;
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
