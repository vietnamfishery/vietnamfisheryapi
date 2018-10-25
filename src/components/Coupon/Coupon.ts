import { BaseComponent } from '../baseComponents';
import { CouponServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Coupon extends BaseComponent {
    private couponServives: CouponServives;
    private couponId: number;
    private seasonId: number;
    private materialId: number;
    private quantity: number;
    private unitPrices: number;
    private providerInfo: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.couponServives = new CouponServives();
        this.services = this.couponServives;
    }

    public set setCouponId(couponId) {
        this.couponId = couponId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setMaterialId(materialId) {
        this.materialId = materialId;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setUnitPrices(unitPrices) {
        this.unitPrices = unitPrices;
    }

    public set setProviderInfo(providerInfo) {
        this.providerInfo = providerInfo;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setCoupon(
        couponId: number,
        seasonId: number,
        materialId: number,
        quantity: number,
        unitPrices: number,
        providerInfo?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setCouponId = couponId;
        this.setSeasonId = seasonId;
        this.setMaterialId = materialId;
        this.setQuantity = quantity;
        this.setUnitPrices = unitPrices;
        this.setProviderInfo = providerInfo;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getSeasonId (): number {
        return this.seasonId;
    }

    public get getMaterialId (): number {
        return this.materialId;
    }

    public get getQuantity (): number {
        return this.quantity;
    }

    public get getUnitPrices (): number {
        return this.unitPrices;
    }

    public get getProviderInfo (): string {
        return this.providerInfo;
    }

    public get getCreatedDate (): Date {
        return this.createdDate;
    }

    public get getIsDeleted (): number {
        return this.isDeleted;
    }
}
