import { BaseComponent } from '../baseComponents';
import { UsingVeterinaryServices } from '../../services';

export class UsingVeterinary extends BaseComponent {
    public usingVeterinaryServices: UsingVeterinaryServices;
    private usingVeterinaryId: number;
    private usingVeterinaryUUId: string;
    private takeCareId: number;
    private storageId: number;
    private causesNSymptoms: string;
    private averageSize: number;
    private totalBiomass: number;
    private quantity: number;
    private result: string;
    private latestHarvestDate: number;
    private mentor: string;
    private createdBy: string;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.usingVeterinaryServices = new UsingVeterinaryServices();
        this.services = this.usingVeterinaryServices;
    }

    public set setUsingVeterinaryId(usingVeterinaryId) {
        this.usingVeterinaryId = usingVeterinaryId;
    }

    public set setUsingVeterinaryUUId(usingVeterinaryUUId) {
        this.usingVeterinaryUUId = usingVeterinaryUUId;
    }

    public set setTakeCareId(takeCareId) {
        this.takeCareId = takeCareId;
    }

    public set setStorageId(storageId) {
        this.storageId = storageId;
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

    public set setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

    public setUsingveterinary(
        usingVeterinaryId: number,
        usingVeterinaryUUId: string,
        takeCareId: number,
        storageId: number,
        causesNSymptoms: string,
        averageSize: number,
        totalBiomass: number,
        quantity: number,
        result: string,
        latestHarvestDate: number,
        mentor: string,
        createdBy?: string,
        createdDate?: Date,
        isDeleted?: number
    ) {
        this.setUsingVeterinaryId = usingVeterinaryId;
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
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getUsingVeterinaryId(): number {
        return this.usingVeterinaryId;
    }

    public get getUsingVeterinaryUUId(): string {
        return this.usingVeterinaryUUId;
    }

    public get getTakeCareId(): number {
        return this.takeCareId;
    }

    public get getStorageId(): number {
        return this.storageId;
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
