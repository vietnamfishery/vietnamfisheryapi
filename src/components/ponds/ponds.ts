import { BaseComponent } from '../baseComponents';
import { PondsServices } from '../../services';
import { Promise } from '../../lib';

export class Pond extends BaseComponent {
    private pondsServices: PondsServices;
    constructor(
        public pondUUId: string,
        public pondName: string,
        public latitude: number,
        public longitude: number,
        public pondArea: number,
        public pondDepth: number,
        public createdCost: number,
        public status: number,
        public createdBy: string,
        public updatedBy: string,
        public createdDate: Date,
        public updatedDate: Date,
        public isDeteled: number
    ) {
        super();
    }

    public getAllPond(): Promise<Pond> {
        return new Promise((resolve, reject) => {
            this.pondsServices.getAll().then((pond: Pond) => {
                if(pond) {
                    resolve(pond);
                } else {
                    resolve(null);
                }
            });
        });
    }
}
