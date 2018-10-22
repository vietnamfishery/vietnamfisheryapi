import { BaseComponent } from '../baseComponents';
import { PondPrepareDetailsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondPrepareDetail extends BaseComponent {
    private pondPrepareDetailsServices: PondPrepareDetailsServices;
    private pondPrepareDetailUUId: string;
    private pondPrepareId: number;
    private storageId: number;
    private pondPrepareDetailId: number;
    private quantity: number;
    constructor() {
        super();
        this.pondPrepareDetailsServices = new PondPrepareDetailsServices();
        this.services = this.pondPrepareDetailsServices;
    }

    public set setPondPrepareDetailId(pondPrepareDetailId) {
        this.pondPrepareDetailId = pondPrepareDetailId;
    }

    public set setPondPrepareDetailUUId(pondPrepareDetailUUId) {
        this.pondPrepareDetailUUId = pondPrepareDetailUUId;
    }

    public set setPondPrepareId(pondPrepareId) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setStorageId(storageId) {
        this.storageId = storageId;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public setPondpreparedetails(
        pondPrepareDetailUUId: string,
        pondPrepareId: number,
        storageId: number,
        pondPrepareDetailId: number,
        quantity: number
    ) {
        this.setPondPrepareDetailUUId = pondPrepareDetailUUId;
        this.setPondPrepareId = pondPrepareId;
        this.setStorageId = storageId;
        this.setPondPrepareDetailId = pondPrepareDetailId;
        this.setQuantity = quantity;
    }

    public get getPondPrepareDetailUUId(): string {
        return this.pondPrepareDetailUUId;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getPondPrepareDetailId(): number {
        return this.pondPrepareDetailId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

}
