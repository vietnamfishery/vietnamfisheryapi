import { BaseComponent } from '../baseComponents';
import { CouponServives } from '../../services'; // import services

export class Coupon extends BaseComponent {
    public couponServives: CouponServives;
    private couponId: number;
    private userId: number;
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

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setCoupon(
        couponId: number,
        userId: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setCouponId = couponId;
        this.setUserId = userId;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getUserId (): number {
        return this.userId;
    }

    public get getCreatedDate (): Date {
        return this.createdDate;
    }

    public get getIsDeleted (): number {
        return this.isDeleted;
    }
}
