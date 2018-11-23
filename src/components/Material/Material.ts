import { BaseComponent } from '../baseComponents';
import { MaterialServives } from '../../services';

export class Material extends BaseComponent {
    public materialServives: MaterialServives;
    private materialId: number;
    private materialUUId: string;
    private couponId: number;
    private storageId: number;
    private provider: string;
    private providerAddress: string;
    private quantity: number;
    private unit: number;
    private unitPrice: number;
    private isDeleted: number;
    constructor() {
        super();
        this.materialServives = new MaterialServives();
        this.services = this.materialServives;
    }

    public set setMaterialId(materialId: number) {
        this.materialId = materialId;
    }

    public set setMaterialUUId(materialUUId: string) {
        this.materialUUId = materialUUId;
    }

    public set setCouponId(couponId: number) {
        this.couponId = couponId;
    }

    public set setStorageId(storageId: number) {
        this.storageId = storageId;
    }

    public set setProvider(provider: string) {
        this.provider = provider;
    }

    public set setProviderAddress(providerAddress: string) {
        this.providerAddress = providerAddress;
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

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setMaterial(
        materialId: number,
        materialUUId: string,
        couponId: number,
        storageId: number,
        provider: string,
        providerAddress: string,
        quantity: number,
        unit: number,
        unitPrice: number,
        isDeleted?: number
    ) {
        this.setMaterialId = materialId;
        this.setMaterialUUId = materialUUId;
        this.setCouponId = couponId;
        this.setStorageId = storageId;
        this.setProvider = provider;
        this.setProviderAddress = providerAddress;
        this.setQuantity = quantity;
        this.setUnit = unit;
        this.setUnitPrice = unitPrice;
        this.setIsDeleted = isDeleted;
    }

    public get getMaterialId(): number {
        return this.materialId;
    }

    public get getMaterialUUId(): string {
        return this.materialUUId;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getProvider(): string {
        return this.provider;
    }

    public get getProviderAddress(): string {
        return this.providerAddress;
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

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
