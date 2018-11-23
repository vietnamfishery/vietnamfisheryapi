import { BaseComponent } from '../baseComponents';
import { CouponServives } from '../../services'; // import services

export class Coupon extends BaseComponent {
    public couponServives: CouponServives;
    private couponId: number;
    private userId: number;
    private seasonId: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.couponServives = new CouponServives();
        this.services = this.couponServives;
    }

    public set setCouponId(couponId: number) {
        this.couponId = couponId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setSeasonId(seasonId: number) {
        this.seasonId = seasonId;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setCoupon(
        couponId: number,
        userId: number,
        seasonId: number,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setCouponId = couponId;
        this.setUserId = userId;
        this.setSeasonId= seasonId;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getCouponId(): number {
        return this.couponId;
    }

    public get getUserId (): number {
        return this.userId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getCreatedDate (): Date {
        return this.createdDate;
    }

    public get getIsDeleted (): number {
        return this.isDeleted;
    }
}
