export interface ICoupon {
    couponId: number;
    couponUUId: string;
    userId: number;
    couponName: string;
    couponType: number;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: number;
}
