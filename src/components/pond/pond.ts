import { BaseComponent } from '../baseComponents';
import { PondsServices } from '../../services';

export class Pond extends BaseComponent {
    public pondsServices: PondsServices;
    private pondId: number;
    private pondUUId: string;
    private userId: number;
    private pondName: string;
    private pondArea: number;
    private pondDepth: number;
    private createCost: number;
    private pondCreatedDate: Date;
    private status: number;
    private isFed: number;
    private isDiary: number;
    private images: string;
    private pondLatitude: number;
    private pondLongitude: number;
    private createdBy: string;
    private createdDate: Date;
    private updatedBy: string;
    private updatedDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondsServices = new PondsServices();
        this.services = this.pondsServices;
    }

    public set setPondId(pondId: number) {
        this.pondId = pondId;
    }

    public set setPondUUId(pondUUId: string) {
        this.pondUUId = pondUUId;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setPondName(pondName: string) {
        this.pondName = pondName;
    }

    public set setPondArea(pondArea: number) {
        this.pondArea = pondArea;
    }

    public set setPondDepth(pondDepth: number) {
        this.pondDepth = pondDepth;
    }

    public set setCreateCost(createCost: number) {
        this.createCost = createCost;
    }

    public set setPondCreatedDate(pondCreatedDate: Date) {
        this.pondCreatedDate = pondCreatedDate;
    }

    public set setStatus(status: number) {
        this.status = status;
    }

    public set setIsFed(isFed: number) {
        this.isFed = isFed;
    }

    public set setIsDiary(isDiary: number) {
        this.isDiary = isDiary;
    }

    public set setImages(images: string) {
        this.images = images;
    }

    public set setPondLatitude(pondLatitude: number) {
        this.pondLatitude = pondLatitude;
    }

    public set setPondLongitude(pondLongitude: number) {
        this.pondLongitude = pondLongitude;
    }

    public set setCreatedBy(createdBy: string) {
        this.createdBy = createdBy;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setUpdatedBy(updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public set setUpdatedDate(updatedDate: Date) {
        this.updatedDate = updatedDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setPond(
        pondId: number,
        pondUUId: string,
        userId: number,
        pondName: string,
        pondArea: number,
        pondDepth: number,
        createCost: number,
        pondCreatedDate: Date,
        status: number,
        isFed: number,
        isDiary: number,
        images: string,
        pondLatitude?: number,
        pondLongitude?: number,
        createdBy?: string,
        createdDate?: Date,
        updatedBy?: string,
        updatedDate?: Date,
        isDeleted?: number
    ) {
        this.setPondId = pondId;
        this.setPondUUId = pondUUId;
        this.setUserId = userId;
        this.setPondName = pondName;
        this.setPondArea = pondArea;
        this.setPondDepth = pondDepth;
        this.setCreateCost = createCost;
        this.setStatus = status || status === 0 ? status * 1 : null;
        this.setIsFed = isFed;
        this.setIsDiary = isDiary;
        this.setImages = images;
        this.setPondLatitude = pondLatitude;
        this.setPondLongitude = pondLongitude;
        this.setPondCreatedDate = pondCreatedDate;
        this.setCreatedBy = createdBy;
        this.setCreatedDate = createdDate;
        this.setUpdatedBy = updatedBy;
        this.setUpdatedDate = updatedDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getPondUUId(): string {
        return this.pondUUId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getPondName(): string {
        return this.pondName;
    }

    public get getPondArea(): number {
        return this.pondArea;
    }

    public get getPondDepth(): number {
        return this.pondDepth;
    }

    public get getCreateCost(): number {
        return this.createCost;
    }

    public get getStatus(): Date {
        return this.pondCreatedDate;
    }

    public get getIsFed(): number {
        return this.status;
    }

    public get getIsDiary(): number {
        return this.isFed;
    }

    public get getImages(): number {
        return this.isDiary;
    }

    public get getPondLatitude(): string {
        return this.images;
    }

    public get getPondLongitude(): number {
        return this.pondLatitude;
    }

    public get getPondCreatedDate(): number {
        return this.pondLongitude;
    }

    public get getCreatedBy(): string {
        return this.createdBy;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getUpdatedBy(): string {
        return this.updatedBy;
    }

    public get getUpdatedDate(): Date {
        return this.updatedDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
