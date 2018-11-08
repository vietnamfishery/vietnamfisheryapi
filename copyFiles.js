const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
const isProd = env === 'production';
var shell = require('shelljs');

shell.cp('package.json', 'dist/package.json');
shell.cp(isProd ? 'pm2/processes.prod.json' : 'pm2/processes.dev.json', 'dist/processes.json');
