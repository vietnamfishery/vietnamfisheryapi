import { ServerExpress } from './app';
import * as config from './config';
import * as Debug from 'debug';
const debug = Debug('express:server');

// create http server port
const port = process.env.PORT || config.port;
export const server = ServerExpress.bootstrap().server;
server.listen(port, () => {
    console.log(`App listening on host http://localhost:${ port }`);
});
