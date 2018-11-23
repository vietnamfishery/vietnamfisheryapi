import { BaseComponent } from '../baseComponents';
import { PondUserRolesServices } from '../../services';

export class PondUserRole extends BaseComponent {
    public pondUserRolesServices: PondUserRolesServices;
    private pondUserRolesId: number;
    private userId: number;
    private pondId: number;
    private createdDate: Date;
    private isDeleted: number;
    constructor() {
        super();
        this.pondUserRolesServices = new PondUserRolesServices();
        this.services = this.pondUserRolesServices;
    }

    public set setPondUserRolesId(id: number) {
        this.pondUserRolesId = id;
    }

    public set setUserId(userId: number) {
        this.userId = userId;
    }

    public set setPondId(pondId: number) {
        this.pondId = pondId;
    }

    public set setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    public set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    public setPondUserRoles(pondUserRolesId?: number, userId?: number, pondId?: number, createdDate?: Date, isDeleted?: number) {
        this.setPondUserRolesId = pondUserRolesId;
        this.setUserId = userId;
        this.setPondId = pondId;
        this.setCreatedDate = createdDate;
        this.setIsDeleted = isDeleted;
    }

    public get getPondUserRolesId(): number {
        return this.pondUserRolesId;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getPondId(): number {
        return this.pondId;
    }

    public get getCreatedDate(): Date {
        return this.createdDate;
    }

    public get getIsDeleted(): number {
        return this.isDeleted;
    }
}
