import { BaseComponent } from '../baseComponents';
import { BoughtBreedServives } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class BoughtBreed extends BaseComponent {
    private boughtBreedServives: BoughtBreedServives;
    private boughtBreedId: number;
    private boughtBreedUUId: string;
    private userId: number;
    private boughtBreedName: string;
    constructor() {
        super();
        this.boughtBreedServives = new BoughtBreedServives();
        this.services = this.boughtBreedServives;
    }

    public set setBoughtBreedId(boughtBreedId) {
        this.boughtBreedId = boughtBreedId ? boughtBreedId : null;
    }

    public set setBoughtBreedUUId(boughtBreedUUId) {
        this.boughtBreedUUId = boughtBreedUUId;
    }

    public set setUserId(userId) {
        this.userId = userId;
    }

    public set setBoughtBreedName(boughtBreedName) {
        this.boughtBreedName = boughtBreedName;
    }

    public setBoughtBreeds(
        boughtBreedId: number,
        boughtBreedUUId: string,
        userId: number,
        boughtBreedName: string
    ) {
        this.setBoughtBreedId = boughtBreedId;
        this.setBoughtBreedUUId = boughtBreedUUId;
        this.setUserId = userId;
        this.setBoughtBreedName = boughtBreedName;
    }

    public get getBoughtBreedId(): number {
        return this.boughtBreedId;
    }

    public get getBoughtBreedUUId(): string {
        return this.boughtBreedUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getBoughtBreedName(): string {
        return this.boughtBreedName;
    }
}
