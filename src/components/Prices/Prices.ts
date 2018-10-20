import { BaseComponent } from '../baseComponents';
import { PricesServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Prices extends BaseComponent {
    private pricesServices: PricesServices;
    private priceId: number;
    private priceUUId: string;
    private storageId: number;
    private quantity: number;
    private unit: number;
    private value: number;
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

    public set setStorageId(storageId) {
        this.storageId = storageId;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setUnit(unit) {
        this.unit = unit;
    }

    public set setValue(value) {
        this.value = value;
    }

    public setPrices(
        priceId: number,
        priceUUId: string,
        storageId: number,
        quantity: number,
        unit: number,
        value: number
    ) {
        this.setPriceId = priceId;
        this.setPriceUUId = priceUUId;
        this.setStorageId = storageId;
        this.setQuantity = quantity;
        this.setUnit = unit;
        this.setValue = value;
    }

    public get getPriceId(): number {
        return this.priceId;
    }

    public get getPriceUUId(): string {
        return this.priceUUId;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getUnit(): number {
        return this.unit;
    }

    public get getValue(): number {
        return this.value;
    }

}
