export interface IPondenvironments {
    pondEnvironmentId: number;
    pondEnvironmentUUId: string;
    seasonId: number;
    oxyMorning: number;
    oxyAfternoon: number;
    phMorning: number;
    phAfternoon: number;
    transparent: number;
    salinity: number;
    h2s: number;
    nh3: number;
    bazo: number;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isDeleted: number;
}
