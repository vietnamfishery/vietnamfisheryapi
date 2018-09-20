/*
* The Promise module using bluebird
*/

import * as Promise from 'bluebird';

Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

export { Promise };
