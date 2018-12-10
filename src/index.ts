import { ServerExpress } from './app';
import { colorCli, port, host } from './config';
import * as Debug from 'debug';
const debug = Debug('express:server');

// create http server port
export const server = ServerExpress.bootstrap().server;
server.listen(process.env.PORT || port, () => {
    console.log(`${colorCli.WHITE}App listening on host ${colorCli.MAGENTA}http://${host}:${process.env.PORT || port}${colorCli.RESET}`);
});
