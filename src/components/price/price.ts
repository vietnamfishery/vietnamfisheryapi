import { BaseComponent } from '../baseComponents';
import { PricesServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Price extends BaseComponent {
    public pricesServices: PricesServices;
    private priceId: number;
    private priceUUId: string;
    private seasonId: number;
    private totalCost: number;
    private totalProfit: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pricesServices = new PricesServices();
        this.services = this.pricesServices;
    }

    public set setPriceId(priceId) {
        this.priceId = priceId;
    }

    public set setPriceUUId(priceUUId) {
        this.priceUUId = priceUUId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setTotalCost(totalCost) {
        this.totalCost = totalCost;
    }

    public set setTotalProfit(totalProfit) {
        this.totalProfit = totalProfit;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPrices(
        priceId: number,
        priceUUId: string,
        seasonId: number,
        totalCost: number,
        totalProfit: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setPriceId = priceId;
        this.setPriceUUId = priceUUId;
        this.setSeasonId = seasonId;
        this.setTotalCost = totalCost;
        this.setTotalProfit = totalProfit;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPriceId(): number {
        return this.priceId;
    }

    public get getPriceUUId(): string {
        return this.priceUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getTotalCost(): number {
        return this.totalCost;
    }

    public get getTotalProfit(): number {
        return this.totalProfit;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
