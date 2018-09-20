import * as SocketIO from 'socket.io';
import { logger } from '../services/logger';
import { PH } from './PH';

export class BaseSocketServer {
    protected socketConnection: SocketIO.Socket;
    public ph: PH;
    constructor(protected io: SocketIO.Server) {
        this.io.on('connection', (socket: SocketIO.Socket) => {
            this.socketConnection = socket;
            logger.info(`${ socket.id } is connected.`);
            socket.on('disconnect', (reason) => {
                logger.info(`${ socket.id } is disconnected. [Reason] is ${ reason }`);
            });
        });
    }
}
