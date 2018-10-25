import { BaseComponent } from '../baseComponents';
import { SeasonAndPondServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class SeasonsAndPond extends BaseComponent {
    private seasonAndPondServices: SeasonAndPondServices;
    private seasonAndPondId: number;
    private seasonId: number;
    private pondId: number;

    constructor() {
        super();
        this.seasonAndPondServices = new SeasonAndPondServices();
        this.services = this.seasonAndPondServices;
    }

    public set setSeasonAndPondId(seasonAndPondId) {
        this.seasonAndPondId = seasonAndPondId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setPondId(pondId) {
        this.pondId = pondId;
    }


    public setSeason(
        seasonAndPondId: number,
        seasonId: number,
        pondId: number,
    ) {
        this.setSeasonAndPondId = seasonAndPondId;
        this.setSeasonId= seasonId;
        this.setPondId = pondId;
    }

    public get getSeasonAndPondId(): number {
        return this.seasonAndPondId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getPondId(): number {
        return this.pondId;
    }
}
