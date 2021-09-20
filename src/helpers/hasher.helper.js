const { randomBytes, pbkdf2Sync } = require('crypto');
const ENV = process.env;

function hashPassword(body) {

}

function verifyPassword(plain_password, hashed_password, salt_key){
    return new Promise((resolve, reject) => {
        const hashPassword = pbkdf2Sync(plain_password, salt_key, parseInt(ENV.ITERATION), parseInt(ENV.KEY_LENGTH), ENV.DIGEST).toString('hex');
        if( hashed_password == hashPassword ){
            resolve(true);
        }else{
            reject(false);
        }
    });
}

module.exports = {
    hashPassword,
    verifyPassword
}