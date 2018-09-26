export class Pond {
    constructor(
        private pondUUId: string,
        private pondName: string,
        private latitude: number,
        private longitude: number,
        private pondArea: number,
        private pondDepth: number,
        private createdCost: number,
        private status: number,
        private createdBy: string,
        private updatedBy: string,
        private createdDate: Date,
        private updatedDate: Date,
        private isDeteled: number
    ) {}
}
