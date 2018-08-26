// import * as SocketIO from 'socket.io';
// import { logger } from '../services/logger';

// export class BaseSocketServer {
//     protected socketConnection: SocketIO.Socket;
//     constructor(protected io: SocketIO.Server) {
//         this.io.on('connection', (socket: SocketIO.Socket) => {
//             this.socketConnection = socket;
//             logger.info(`${ socket.id } is connected.`);
//             socket.on('disconnect', (reason) => {
//                 logger.info(`${ socket.id } is disconnected. [Reason] is ${ reason }`);
//             });
//         });
//     }

//     protected getSocketConnect = (): SocketIO.Socket => {
//         return this.socketConnection;
//     }
// }
