import { BaseComponent } from '../baseComponents';
import { UsingVeterinaryServices } from '../../services'; // import services
import { Promise } from '../../lib';
import { ActionServer } from '../../common';

export class UsingVeterinary extends BaseComponent {
    private usingVeterinaryServices: UsingVeterinaryServices;
    private usingVeterinaryUUId: string;
    private storageId: number;
    private takeCareId: number;
    private causesNSymptoms: string;
    private averageSize: number;
    private totalBiomass: number;
    private quantity: number;
    private result: string;
    private latestHarvestDate: number;
    private mentor: string;
    constructor() {
        super();
        this.usingVeterinaryServices = new UsingVeterinaryServices();
        this.services = this.usingVeterinaryServices;
    }

    public set setUsingVeterinaryUUId(usingVeterinaryUUId) {
        this.usingVeterinaryUUId = usingVeterinaryUUId;
    }

    public set setStorageId(storageId) {
        this.storageId = storageId;
    }

    public set setTakeCareId(takeCareId) {
        this.takeCareId = takeCareId;
    }

    public set setCausesNSymptoms(causesNSymptoms) {
        this.causesNSymptoms = causesNSymptoms;
    }

    public set setAverageSize(averageSize) {
        this.averageSize = averageSize;
    }

    public set setTotalBiomass(totalBiomass) {
        this.totalBiomass = totalBiomass;
    }

    public set setQuantity(quantity) {
        this.quantity = quantity;
    }

    public set setResult(result) {
        this.result = result;
    }

    public set setLatestHarvestDate(latestHarvestDate) {
        this.latestHarvestDate = latestHarvestDate;
    }

    public set setMentor(mentor) {
        this.mentor = mentor;
    }

    public setUsingveterinary(
        usingVeterinaryUUId: string,
        storageId: number,
        takeCareId: number,
        causesNSymptoms: string,
        averageSize: number,
        totalBiomass: number,
        quantity: number,
        result: string,
        latestHarvestDate: number,
        mentor: string
    ) {
        this.setUsingVeterinaryUUId = usingVeterinaryUUId;
        this.setStorageId = storageId;
        this.setTakeCareId = takeCareId;
        this.setCausesNSymptoms = causesNSymptoms;
        this.setAverageSize = averageSize;
        this.setTotalBiomass = totalBiomass;
        this.setQuantity = quantity;
        this.setResult = result;
        this.setLatestHarvestDate = latestHarvestDate;
        this.setMentor = mentor;
    }

    public get getUsingVeterinaryUUId(): string {
        return this.usingVeterinaryUUId;
    }

    public get getStorageId(): number {
        return this.storageId;
    }

    public get getTakeCareId(): number {
        return this.takeCareId;
    }

    public get getCausesNSymptoms(): string {
        return this.causesNSymptoms;
    }

    public get getAverageSize(): number {
        return this.averageSize;
    }

    public get getTotalBiomass(): number {
        return this.totalBiomass;
    }

    public get getQuantity(): number {
        return this.quantity;
    }

    public get getResult(): string {
        return this.result;
    }

    public get getLatestHarvestDate(): number {
        return this.latestHarvestDate;
    }

    public get getMentor(): string {
        return this.mentor;
    }
}
