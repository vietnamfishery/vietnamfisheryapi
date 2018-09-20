import * as SocketIO from 'socket.io';

export class PH {
    constructor(protected io: SocketIO.Server, protected socket: SocketIO.Socket){}

    public receivedPh(): void {
        this.socket.on('server-received-ph', (data) => {
            console.log(data);
        });
    }

    /**
     * Gửi về cho tất cả bao gồm chính client đã gửi lên
     * @param data
     */
    sendAllWithMySelf(data: any): void {
        this.io.sockets.emit('[ser-ph]-send-to-all', data);
    }

    /**
     * Chỉ gửi về chính client đã gửi lên
     * @param data
     */
    sendMySelf(data: any): void {
        this.socket.emit('[ser-ph]-send-to-my-self', data);
    }

    /**
     * Gửi cho tất cả client còn lại ngoại trừ client gửi tín hiệu
     * @param data 
     */
    sendWithoutMySelf(data: any): void {
        this.socket.broadcast.emit('[ser-ph]-send-to-without-my-selt', data);
    }

    /**
     * Gửi đến một socket ID cụ thể.
     * @param id 
     * @param data 
     */
    sendPoint(id: string, data: any): void {
        this.io.to(id).emit('[ser-ph]-send-client-point', data);
    }
}
