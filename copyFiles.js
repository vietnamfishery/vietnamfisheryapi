const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
console.log(process.env.NODE_ENV);
const isProd = env === 'production';
console.log(`##########################################################################`);
console.log(isProd);
console.log(`##########################################################################`);
var shell = require('shelljs');

shell.cp('package.json', 'dist/package.json');
shell.cp(isProd ? 'pm2/processes.prod.json' : 'pm2/processes.dev.json', 'dist/processes.json');
