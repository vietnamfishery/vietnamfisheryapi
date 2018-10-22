import { BaseComponent } from '../baseComponents';
import { PondEnvironmentsServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class PondEnvironment extends BaseComponent {
    private pondEnvironmentsServices: PondEnvironmentsServices;
    private pondEnvironmentId: number;
    private pondEnvironmentUUId: string;
    private seasonId: number;
    private oxyMorning: number;
    private oxyAfternoon: number;
    private phMorning: number;
    private phAfternoon: number;
    private transparent: number;
    private salinity: number;
    private h2s: number;
    private nh3: number;
    private bazo: number;
    constructor() {
        super();
        this.pondEnvironmentsServices = new PondEnvironmentsServices();
        this.services = this.pondEnvironmentsServices;
    }

    public set setPondEnvironmentId(pondEnvironmentId) {
        this.pondEnvironmentId = pondEnvironmentId;
    }

    public set setPondEnvironmentUUId(pondEnvironmentUUId) {
        this.pondEnvironmentUUId = pondEnvironmentUUId;
    }

    public set setSeasonId(seasonId) {
        this.seasonId = seasonId;
    }

    public set setOxyMorning(oxyMorning) {
        this.oxyMorning = oxyMorning;
    }

    public set setOxyAfternoon(oxyAfternoon) {
        this.oxyAfternoon = oxyAfternoon;
    }

    public set setPhMorning(phMorning) {
        this.phMorning = phMorning;
    }

    public set setPhAfternoon(phAfternoon) {
        this.phAfternoon = phAfternoon;
    }

    public set setTransparent(transparent) {
        this.transparent = transparent;
    }

    public set setSalinity(salinity) {
        this.salinity = salinity;
    }

    public set setH2s(h2s) {
        this.h2s = h2s;
    }

    public set setNh3(nh3) {
        this.nh3 = nh3;
    }

    public set setBazo(bazo) {
        this.bazo = bazo;
    }

    public setPondenvironments(
        pondEnvironmentId: number,
        pondEnvironmentUUId: string,
        seasonId: number,
        oxyMorning: number,
        oxyAfternoon: number,
        phMorning: number,
        phAfternoon: number,
        transparent: number,
        salinity: number,
        h2s: number,
        nh3: number,
        bazo: number
    ) {
        this.setPondEnvironmentId = pondEnvironmentId;
        this.setPondEnvironmentUUId = pondEnvironmentUUId;
        this.setSeasonId = seasonId;
        this.setOxyMorning = oxyMorning;
        this.setOxyAfternoon = oxyAfternoon;
        this.setPhMorning = phMorning;
        this.setPhAfternoon = phAfternoon;
        this.setTransparent = transparent;
        this.setSalinity = salinity;
        this.setH2s = h2s;
        this.setNh3 = nh3;
        this.setBazo = bazo;
    }

    public get getPondEnvironmentId(): number {
        return this.pondEnvironmentId;
    }

    public get getPondEnvironmentUUId(): string {
        return this.pondEnvironmentUUId;
    }

    public get getSeasonId(): number {
        return this.seasonId;
    }

    public get getOxyMorning(): number {
        return this.oxyMorning;
    }

    public get getOxyAfternoon(): number {
        return this.oxyAfternoon;
    }

    public get getPhMorning(): number {
        return this.phMorning;
    }

    public get getPhAfternoon(): number {
        return this.phAfternoon;
    }

    public get getTransparent(): number {
        return this.transparent;
    }

    public get getSalinity(): number {
        return this.salinity;
    }

    public get getH2s(): number {
        return this.h2s;
    }

    public get getNh3(): number {
        return this.nh3;
    }

    public get getBazo(): number {
        return this.bazo;
    }

}
