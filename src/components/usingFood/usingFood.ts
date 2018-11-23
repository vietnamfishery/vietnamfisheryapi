import { BaseComponent } from '../baseComponents';
import { UsingFoodsServices } from '../../services'; // import services

export class UsingFood extends BaseComponent {
    public usingFoodsServices: UsingFoodsServices;
    private usingFoodId: number;
    private usingFoodUUId: string;
    private takeCareId: number;
    private storageId: number;
    private massOfFishery: number;
    private feedingRate: number;
    private totalFood: number;
    private createdBy: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.usingFoodsServices = new UsingFoodsServices();
        this.services = this.usingFoodsServices;
    }

    public set setUsingFoodId(usingFoodId: number) {
        this.usingFoodId = usingFoodId;
    }

    public set setUsingFoodUUId(usingFoodUUId: string) {
        this.usingFoodUUId = usingFoodUUId;
    }

    public set setStorageId(storageId: number) {
        this.storageId = storageId;
    }

    public set setTakeCareId(takeCareId: number) {
        this.takeCareId = takeCareId;
    }

    public set setMassOfFishery(massOfFishery: number) {
        this.massOfFishery = massOfFishery;
    }

    public set setFeedingRate(feedingRate: number) {
        this.feedingRate = feedingRate;
    }

    public set setTotalFood(totalFood: number) {
        this.totalFood = totalFood;
    }

    public set setCreatedBy(createdBy: string) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setUsingFoods(
        usingFoodId: number,
        usingFoodUUId: string,
        storageId: number,
        takeCareId: number,
        massOfFishery: number,
        feedingRate: number,
        totalFood: number,
        createdBy?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setUsingFoodId = usingFoodId;
        this.setUsingFoodUUId = usingFoodUUId;
        this.setTakeCareId = takeCareId;
        this.setStorageId = storageId;
        this.setMassOfFishery = massOfFishery;
        this.setFeedingRate = feedingRate;
        this.setTotalFood = totalFood;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getUsingFoodId(): number {
        return this.usingFoodId;
    }

    public get getUsingFoodUUId(): string {
        return this.usingFoodUUId;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getTakeCareId(): number {
        return this.takeCareId;
    }

    public get getMassOfFishery(): number {
        return this.massOfFishery;
    }

    public get getFeedingRate(): number {
        return this.feedingRate;
    }

    public get getTotalFood(): number {
        return this.totalFood;
    }

    public get getCreatedBy(): string {
        return this.createdBy;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
