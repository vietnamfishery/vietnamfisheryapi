export interface ICosts {
    costId: number;
    costUUId: string;
    pondPrepareId: number;
    label: string;
    value: number;
    responsible: string;
    notes: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isDeleted: number;
}
