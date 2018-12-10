var fs = require('fs');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'nhz3XUkxLe9j';
var filename = [];
var filenameOutput = [];

var root = process.cwd();

var tool = process.argv[2];
console.log(tool)

switch (tool) {
    case '-e': {
        for(let i = 3; i < process.argv.length; i+=2){
            filename.push(process.argv[i]);
            filenameOutput.push(process.argv[i+1]);
        }

        for(let i = 0; i < filename.length; i++) {
            let f = fs.readFileSync(root + '/' + filename[i], 'utf8');
            let crypted = encrypt(f);
            fs.writeFileSync('./' + filenameOutput[i], crypted);
        }
        break;
    }
    case '-d': {
        for(let i = 3; i < process.argv.length; i+=2){
            filename.push(process.argv[i]);
            filenameOutput.push(process.argv[i+1]);
        }
        for(let i = 0; i < filename.length; i++) {
            let f = fs.readFileSync(root + '/' + filename[i], 'utf8');
            let crypted = decrypt(f);
            fs.writeFileSync('./' + filenameOutput[i], crypted);
        }
        break;
    }
    case '-h': {
        console.log('-e\t:using to encrypt.\n-d\t:using to decrypt.');
    }
    default: {
        return;
    }
}


function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
