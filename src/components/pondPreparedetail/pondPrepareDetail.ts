import { BaseComponent } from '../baseComponents';
import { PondPrepareDetailsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondPrepareDetail extends BaseComponent {
    private pondPrepareDetailsServices: PondPrepareDetailsServices;
    private pondPrepareDetailId: number;
    private pondPrepareDetailUUId: string;
    private materialId: number;
    private pondPrepareId: number;
    private quantity: number;
    private createdDate: Date;
    private isDeleted: number;
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

    public set setMaterialId(materialId) {
        this.materialId = materialId;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setPondpreparedetails(
        pondPrepareDetailUUId: string,
        pondPrepareId: number,
        materialId: number,
        pondPrepareDetailId: number,
        quantity: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setPondPrepareDetailUUId = pondPrepareDetailUUId;
        this.setPondPrepareId = pondPrepareId;
        this.setMaterialId = materialId;
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
        return this.materialId;
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
