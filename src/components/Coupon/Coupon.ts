import { BaseComponent } from '../baseComponents';
import { CouponServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Coupon extends BaseComponent {
    private couponServives: CouponServives;
    private couponId: number;
    private couponUUId: string;
    private userId: number;
    private couponName: string;
    private couponType: number;
    constructor() {
        super();
        this.couponServives = new CouponServives();
        this.services = this.couponServives;
    }

    public set setCouponId(couponId) {
        this.couponId = couponId;
    }

    public set setCouponUUId(couponUUId) {
        this.couponUUId = couponUUId;
    }

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setCouponName(couponName) {
        this.couponName = couponName;
    }

    public set setCouponType(couponType) {
        this.couponType = couponType;
    }

    public setCoupon(
        couponId: number,
        couponUUId: string,
        userId: number,
        couponName: string,
        couponType: number
    ) {
        this.setCouponId = couponId;
        this.setCouponUUId = couponUUId;
        this.setUserId = userId;
        this.setCouponName = couponName;
        this.setCouponType = couponType;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getCouponUUId(): string {
        return this.couponUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getCouponName(): string {
        return this.couponName;
    }

    public get getCouponType(): number {
        return this.couponType;
    }

}
