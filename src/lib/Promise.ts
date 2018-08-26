/*
* The Promise module using bluebird
*/

import Promise from 'bluebird';
Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

export { Promise };
