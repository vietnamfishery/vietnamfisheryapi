import * as SocketIO from 'socket.io';
import { BaseSocketServer } from './BaseSocket';
import { TaskScheduler } from './task-scheduler.socket';

export class SocketBuild extends BaseSocketServer {
    constructor(protected io: SocketIO.Server) {
        super(io);
        new TaskScheduler(this.io);
    }
}
