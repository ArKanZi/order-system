const { randomBytes, pbkdf2Sync } = require('crypto');
const db = require('../db');
const ENV = process.env;


function createUser(body){
    return new Promise(async (resolve, reject) => {
        try {
            const connect = await db.getConnection();
            const query = `INSERT INTO users(Username, Password, SaltKey, IsActive, Created_At, Updated_At)
                            VALUES(?,?,?,?,NOW(), NOW()) ;INSERT INTO userprofiledetail(FirstName, LastName) VALUES(?,?)`;
            // encrypt password
            const saltKey = randomBytes(parseInt(ENV.BYTES)).toString('hex');
            const hashPassword = pbkdf2Sync(body['password'], saltKey, parseInt(ENV.ITERATION), parseInt(ENV.KEY_LENGTH), ENV.DIGEST).toString('hex')
            // end
            const params = [body['email'], hashPassword, saltKey, 0, body['firstName'], body['lastName']];
            const result = await connect.query(query, params);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);            
        }
    });
}


function getUserByEmail(body){
    return new Promise(async (resolve, reject) => {
        try {
            const connect = await db.getConnection();
            const query = `SELECT users.UserId, Username, Password, SaltKey, IsActive, FirstName, LastName FROM users, userprofiledetail WHERE Username=? AND IsActive=? AND users.UserId = userprofiledetail.UserId`;
            const params = [ body['Username'], body['IsActive']];
            const result = await connect.query(query, params);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);            
        }
    });
}

function updatePasswordService(body){
    return new Promise(async (resolve, reject) => {
        try {
            // genrate new password
            const saltKey = randomBytes(parseInt(ENV.BYTES)).toString('hex');
            const hashPassword = pbkdf2Sync(body['Password'], saltKey, parseInt(ENV.ITERATION), parseInt(ENV.KEY_LENGTH), ENV.DIGEST).toString('hex') 
            body['Password'] = hashPassword;
            body['SaltKey'] = saltKey;
            //end
            const connect = await db.getConnection();
            const query = `UPDATE users SET Password=?, SaltKey=? WHERE UserId=?`;
            const params = [ body['Password'], body['SaltKey'], body['UserId'] ];
            const result = await connect.query(query, params);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);            
        }
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    updatePasswordService
}