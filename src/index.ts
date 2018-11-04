import { ServerExpress } from './app';
import * as config from './config';
import * as Debug from 'debug';
const debug = Debug('express:server');

// create http server port
const port = process.env.PORT || config.port;
export const Express: ServerExpress = ServerExpress.bootstrap();
const server = Express.server;
server.listen(port, () => {
    console.log(`App listening on host https://localhost:${ port }`);
});
