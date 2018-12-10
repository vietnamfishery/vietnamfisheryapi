import { ServerExpress } from './app';
import { colorCli, port, host } from './config';
import * as Debug from 'debug';
const debug = Debug('express:server');
import * as greenlock from 'greenlock-express';

// create http server port
export const app = ServerExpress.bootstrap().app;
greenlock.create({
    version: 'draft-11',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    email: 'vietnamfishery@gmail.com',
    agreeTos: true,
    app,
    approvedDomains: ['vietnamfishery.tk', 'www.vietnamfishery.tk'],
    tyMember: true,
    telemetry: false
    // debug: true
}).listen(80,443);
