import * as Stream from 'stream';
import { Promise } from 'bluebird';

export class CustomStream extends Stream {
    constructor() {
        super();
    }

    public static BufferToStream(buffer: Buffer) {
        const stream = new this.Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }

    public static StreamToBuffer(stream: Stream) {
        return new Promise((resolve, reject) => {
            const buffers: Buffer[] = [];
            stream.on('error', reject);
            stream.on('data', (data) => buffers.push(data));
            stream.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
}
