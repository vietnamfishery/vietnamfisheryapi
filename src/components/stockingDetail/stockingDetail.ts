import { BaseComponent } from '../baseComponents';
import { StockingDetailsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class StockingDetail extends BaseComponent {
    private stockingDetailsServices: StockingDetailsServices;
    private stockingDetailUUId: string;
    private breedId: number;
    private stockingId: number;
    private stockingQuantity: number;
    private phFirst: number;
    private salinityFirst: number;
    private isDeleted: number;
    constructor() {
        super();
        this.stockingDetailsServices = new StockingDetailsServices();
        this.services = this.stockingDetailsServices;
    }

    public set setStockingDetailUUId(stockingDetailUUId) {
        this.stockingDetailUUId = stockingDetailUUId;
    }

    public set setBreedId(breedId) {
        this.breedId = breedId;
    }

    public set setStockingId(stockingId) {
        this.stockingId = stockingId;
    }

    public set setStockingQuantity(stockingQuantity) {
        this.stockingQuantity = stockingQuantity;
    }

    public set setPhFirst(phFirst) {
        this.phFirst = phFirst;
    }

    public set setSalinityFirst(salinityFirst) {
        this.salinityFirst = salinityFirst;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setStockingdetails(
        stockingDetailUUId: string,
        breedId: number,
        stockingId: number,
        stockingQuantity: number,
        phFirst: number,
        salinityFirst: number,
        isDeleted?: number
    ) {
        this.setStockingDetailUUId = stockingDetailUUId;
        this.setBreedId = breedId;
        this.setStockingId = stockingId;
        this.setStockingQuantity = stockingQuantity;
        this.setPhFirst = phFirst;
        this.setSalinityFirst = salinityFirst;
        this.setIsDeleted = isDeleted;
    }

    public get getStockingDetailUUId(): string {
        return this.stockingDetailUUId;
    }

    public get getBreedId(): number {
        return this.breedId;
    }

    public get getStockingId(): number {
        return this.stockingId;
    }

    public get getStockingQuantity(): number {
        return this.stockingQuantity;
    }

    public get getPhFirst(): number {
        return this.phFirst;
    }

    public get getSalinityFirst(): number {
        return this.salinityFirst;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
