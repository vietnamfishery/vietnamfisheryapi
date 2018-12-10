import * as SocketIO from 'socket.io';
import { BaseSocketServer } from './BaseSocket';
import { PondsServices } from '../services';
import * as schedule from 'node-schedule';
import { DateUtil } from '../lib';

export class TaskScheduler extends BaseSocketServer {

    private pondsServices: PondsServices = new PondsServices();

    constructor(protected io: SocketIO.Server) {
        super(io);
        const timeToUpdate: any = DateUtil.endOf(new Date(), 'dates');
        // const timeToUpdate: any = new Date(2018,11,10,17,11,0);

        schedule.scheduleJob(timeToUpdate, async () => {
            await this.pondsServices.models.update({
                isFed: 0
            });
            this.io.sockets.emit('update-using-food-status', {
                success: true
            });
        });
    }
}
