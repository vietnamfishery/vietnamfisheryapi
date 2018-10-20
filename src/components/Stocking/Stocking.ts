import { BaseComponent } from '../baseComponents';
import { StockingServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Stocking extends BaseComponent {
    private stockingServices: StockingServices;
    private stockingId: number;
    private stockingUUId: string;
    private seasonId: number;
    private notes: string;
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

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setNotes(notes) {
        this.notes = notes;
    }

    public setStocking(
        stockingId: number,
        stockingUUId: string,
        seasonId: number,
        notes: string
    ) {
        this.setStockingId = stockingId;
        this.setStockingUUId = stockingUUId;
        this.setSeasonId = seasonId;
        this.setNotes = notes;
    }

    public get getStockingId(): number {
        return this.stockingId;
    }

    public get getStockingUUId(): string {
        return this.stockingUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getNotes(): string {
        return this.notes;
    }
}
