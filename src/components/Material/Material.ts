import { BaseComponent } from '../baseComponents';
import { MaterialServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Material extends BaseComponent {
    private materialServives: MaterialServives;
    private materialId: number;
    private materialUUId: string;
    private itemName: string;
    private provider: string;
    private providerAddress: string;
    private quantity: number;
    private unit: number;
    private unitPrice: number;
    private dom: Date;
    private ed: Date;
    private productionBatch: string;
    private description: string;
    private isDeleted: number;
    constructor() {
        super();
        this.materialServives = new MaterialServives();
        this.services = this.materialServives;
    }

    public set setMaterialId(materialId) {
        this.materialId = materialId;
    }

    public set setMaterialUUId(materialUUId) {
        this.materialUUId = materialUUId;
    }

    public set setItemName(itemName) {
        this.itemName = itemName;
    }

    public set setProvider(provider) {
        this.provider = provider;
    }

    public set setProviderAddress(providerAddress) {
        this.providerAddress = providerAddress;
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

    public set setDom(dom) {
        this.dom = dom;
    }

    public set setEd(ed) {
        this.ed = ed;
    }

    public set setProductionBatch(productionBatch) {
        this.productionBatch = productionBatch;
    }

    public set setDescription(description) {
        this.description = description;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
    public setMaterial(
        materialId: number,
        materialUUId: string,
        itemName: string,
        storageId: number,
        provider: string,
        providerAddress: string,
        quantity: number,
        unit: number,
        unitPrice: number,
        dom?: Date,
        ed?: Date,
        productionBatch?: string,
        description?: string,
        isDeleted?: number
    ) {
        this.setMaterialId = materialId;
        this.setMaterialUUId = materialUUId;
        this.setItemName = itemName;
        this.setProvider = provider;
        this.setProviderAddress = providerAddress;
        this.setQuantity = quantity;
        this.setUnit = unit;
        this.setUnitPrice = unitPrice;
        this.setDom = dom;
        this.setEd = ed;
        this.setProductionBatch = productionBatch;
        this.setDescription = description;
        this.setIsDeleted = isDeleted;
    }

    public get getMaterialId(): number {
        return this.materialId;
    }

    public get getMaterialUUId(): string {
        return this.materialUUId;
    }

    public get getItemName(): string {
        return this.itemName;
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

    public get getDom(): Date {
        return this.dom;
    }

    public get getEd(): Date {
        return this.ed;
    }

    public get getProdcutionBatch(): string {
        return this.productionBatch;
    }

    public get getDescription(): string {
        return this.description;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
