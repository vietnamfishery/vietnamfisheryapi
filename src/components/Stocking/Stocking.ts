import { BaseComponent } from '../baseComponents';
import { StockingServices } from '../../services'; // import services

export class Stocking extends BaseComponent {
    public stockingServices: StockingServices;
    private stockingId: number;
    private stockingUUId: string;
    private seasonAndPondId: number;
    private notes: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.stockingServices = new StockingServices();
        this.services = this.stockingServices;
    }

    public set setStockingId(stockingId) {
        this.stockingId = stockingId;
    }

    public set setStockingUUId(stockingUUId) {
        this.stockingUUId = stockingUUId;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setNotes(notes) {
        this.notes = notes;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setStocking(
        stockingId: number,
        stockingUUId: string,
        seasonAndPondId: number,
        notes: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setStockingId = stockingId;
        this.setStockingUUId = stockingUUId;
        this.setSeasonAndPondId = seasonAndPondId;
        this.setNotes = notes;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getStockingId(): number {
        return this.stockingId;
    }

    public get getStockingUUId(): string {
        return this.stockingUUId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getNotes(): string {
        return this.notes;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
