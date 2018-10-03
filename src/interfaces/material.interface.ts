export interface IMaterial {
    materialUUId: string;
    couponId: number;
    storageId: number;
    provider: string;
    providerAddress: string;
    quantity: number;
    unit: number;
    unitPrice: number;
    dom: Date;
    ed: Date;
    prodcutionBatch: string;
    isDeleted: number;
}
