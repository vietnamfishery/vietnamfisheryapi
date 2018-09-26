import { Router } from 'express';

export abstract class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    public static path = '/api';
    protected router = Router();

    constructor () {
        // something with to do
    }
}
