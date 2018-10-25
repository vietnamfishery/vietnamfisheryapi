import { BaseComponent } from '../baseComponents';
import { UsingFoodsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class UsingFood extends BaseComponent {
    private usingFoodsServices: UsingFoodsServices;
    private usingFoodId: number;
    private usingFoodUUId: string;
    private takeCareId: number;
    private materialId: number;
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

    public set setUsingFoodId(usingFoodId) {
        this.usingFoodId = usingFoodId;
    }

    public set setUsingFoodUUId(usingFoodUUId) {
        this.usingFoodUUId = usingFoodUUId;
    }

    public set setMaterialId(materialId) {
        this.materialId = materialId;
    }

    public set setTakeCareId(takeCareId) {
        this.takeCareId = takeCareId;
    }

    public set setMassOfFishery(massOfFishery) {
        this.massOfFishery = massOfFishery;
    }

    public set setFeedingRate(feedingRate) {
        this.feedingRate = feedingRate;
    }

    public set setTotalFood(totalFood) {
        this.totalFood = totalFood;
    }

    public set setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setUsingfoods(
        usingFoodId: number,
        usingFoodUUId: string,
        materialId: number,
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
        this.setMaterialId = materialId;
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

    public get getMaterialId(): number {
        return this.materialId;
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
