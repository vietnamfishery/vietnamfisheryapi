import * as path from 'path';
import setEnvironment from './bin/setEnvironment';
setEnvironment();
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as createError from 'http-errors';
import * as compression from 'compression';
import * as session from 'express-session';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import { readFileSync } from 'fs';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as SocketIO from 'socket.io';
import { createServer, Server } from 'http';
// import { createServer, Server } from 'https';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import DBHelper from './helpers/db-helpers';
// socket import
import { BaseSocketServer } from './socketServer';

import { ApiRoutes } from './routes';
import { logger } from './services';
// must be after config env
import { GoogleDrive } from './googleAPI/drive.google';

/**
 * The server.
 *
 * @class Server
 */
export class ServerExpress {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): ServerExpress {
        return new ServerExpress();
    }

    public app: express.Application;
    public server: Server;
    public io: SocketIO.Server;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();
        // create server for socket io
        // const certsPath = path.join(__dirname, 'certs', 'server');
        // const caCertsPath = path.join(__dirname, 'certs', 'ca');
        // const options: any = {
        //     key: readFileSync(path.join(certsPath, 'my-server.key.pem'), { encoding: 'utf8'}),
        //     cert: readFileSync(path.join(certsPath, 'my-server.crt.pem'), { encoding: 'utf8'}),
        //     ca: readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem'), { encoding: 'utf8'}),
        //     requestCert: false,
        //     rejectUnauthorized: false
        // };
        this.server = createServer(this.app);
        // this.server = createServer(options,this.app);
        // Add socket server
        this.io = SocketIO(this.server);
        new BaseSocketServer(this.io);
        // Google Drive API
        new GoogleDrive();
        // configure application
        this.config();
        // add routes
        this.routes();
        // handle error
        this.handleErr();
        // connect db
        DBHelper.getDatabaseConnection();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        // add static paths
        this.app.use('/assets', express.static(path.join(__dirname, '../public')));

        // set template
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');

        // mount logger
        this.app.use(morgan('tiny', {
            stream: {
                write: (message: string) => logger.info(message.trim()),
            },
        } as morgan.Options));

        // mount urlencode parser
        this.app.use(bodyParser.json({
            limit: '50mb'
        }));

        // mount urlencode parser
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        // mount query string parser
        this.app.use(cookieParser());

        this.app.use(session({
            secret: 'vietnamfisherysecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
              maxAge: 365 * 24 * 60 * 60 * 1000
            }
        }));

        /**
         * Using passport
         */
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // mount override?
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(methodOverride());
        this.app.use(expressStatusMonitor());
        // using file upload
        this.app.use(fileUpload());
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }

    private handleErr() {
        // catch 404 and forward to error handler
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(createError(404));
        });

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            // err.status = 404;
            // next(err);
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        // error handling
        this.app.use(errorHandler());
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        this.app.use(ApiRoutes.path, ApiRoutes.router);
    }
}
