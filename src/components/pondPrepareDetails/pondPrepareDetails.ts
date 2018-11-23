import { BaseComponent } from '../baseComponents';
import { PondPrepareDetailsServices } from '../../services'; // import services

export class PondPrepareDetail extends BaseComponent {
    public pondPrepareDetailsServices: PondPrepareDetailsServices;
    private pondPrepareDetailId: number;
    private pondPrepareDetailUUId: string;
    private storageId: number;
    private pondPrepareId: number;
    private quantity: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondPrepareDetailsServices = new PondPrepareDetailsServices();
        this.services = this.pondPrepareDetailsServices;
    }

    public set setPondPrepareDetailId(pondPrepareDetailId: number) {
        this.pondPrepareDetailId = pondPrepareDetailId;
    }

    public set setPondPrepareDetailUUId(pondPrepareDetailUUId: string) {
        this.pondPrepareDetailUUId = pondPrepareDetailUUId;
    }

    public set setPondPrepareId(pondPrepareId: number) {
        this.pondPrepareId = pondPrepareId;
    }

    public set setStorageId(storageId: number) {
        this.storageId = storageId;
    }

    public set setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setPondpreparedetails(
        pondPrepareDetailId: number,
        pondPrepareDetailUUId: string,
        pondPrepareId: number,
        storageId: number,
        quantity: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setPondPrepareDetailUUId = pondPrepareDetailUUId;
        this.setPondPrepareId = pondPrepareId;
        this.setStorageId = storageId;
        this.setPondPrepareDetailId = pondPrepareDetailId;
        this.setQuantity = quantity;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondPrepareDetailUUId(): string {
        return this.pondPrepareDetailUUId;
    }

    public get getPondPrepareId(): number {
        return this.pondPrepareId;
    }

    public get getMaterialId(): number {
        return this.storageId;
    }

    public get getPondPrepareDetailId(): number {
        return this.pondPrepareDetailId;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
