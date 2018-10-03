export interface IPonds {
    pondId: number;
    pondUUId: string;
    userId: number;
    pondName: string;
    pondArea: number;
    pondDepth: number;
    createCost: number;
    status: number;
    images: string;
    pondLatitude: number;
    pondLongitude: number;
    createdBy:string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isDeleted: number;
}
