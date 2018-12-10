// import { BaseSocketServer } from './BaseSocket';
// import * as SocketIO from 'socket.io';
// // import redis from 'socket.io-redis';

// export class PhSocket extends BaseSocketServer {
//     protected socket: SocketIO.Socket;
//     constructor(protected io: SocketIO.Server) {
//         super(io);
//         // this.io.adapter(redis({host: 'localhost', port: 6789}));
//         this.socket = super.getSocketConnect();
//     }

//     public sendPH = () => {
//         this.socket.on('okay', (data: any) => {
//             console.log(data);
//         });
//     };
// }
