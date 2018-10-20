import { BaseComponent } from '../baseComponents';
import { UsingFoodsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class Usingfoods extends BaseComponent {
    private usingFoodsServices: UsingFoodsServices;
    private usingFoodUUId: string;
    private storageId: number;
    private takeCareId: number;
    private massOfFishery: number;
    private feedingRate: number;
    private totalFood: number;
    constructor() {
        super();
        this.usingFoodsServices = new UsingFoodsServices();
        this.services = this.usingFoodsServices;
    }

    public set setUsingFoodUUId(usingFoodUUId) {
        this.usingFoodUUId = usingFoodUUId;
    }

    public set setStorageId(storageId) {
        this.storageId = storageId;
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

    public setUsingfoods(
        usingFoodUUId: string,
        storageId: number,
        takeCareId: number,
        massOfFishery: number,
        feedingRate: number,
        totalFood: number
    ) {
        this.setUsingFoodUUId = usingFoodUUId;
        this.setStorageId = storageId;
        this.setTakeCareId = takeCareId;
        this.setMassOfFishery = massOfFishery;
        this.setFeedingRate = feedingRate;
        this.setTotalFood = totalFood;
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
}
