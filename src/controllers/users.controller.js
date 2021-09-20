const { verifyPassword, hashPassword } = require('../helpers/hasher.helper');
const userService = require('../services/user.service');
const updateEvent = require('../event/updateProduct.event');

async function login(req, res){
    const message = await req.consumeFlash('danger');
    res.render('users/login', {title: 'Login', message: message});
}

function register(req, res){
    res.render('users/register', {title: 'Register'});
    
}

function onRegister(req, res){
    const body = req.body;
    userService.createUser(body).then(
        result => {
            if(result.insertId != 0){
                res.redirect('/register');
            }
        }
    ).catch(
        error => {
            console.log(error);
        }
    )
}

function onUserLogin(req, res) {
    const { email, password } = req.body;
    const loginBody = {
        Username: email,
        IsActive: 1
    };

    userService.getUserByEmail(loginBody).then(
         (resultUser) => {
            //console.log(resultUser);

            if(resultUser.length > 0){
                const user = resultUser[0];
                // password verify
                verifyPassword(password, user['Password'], user['SaltKey']).then(
                    (result)=> {
                    req.session.user = resultUser[0];
                    // res.json(resultUser);
                    updateEvent.emit('updateProduct', user['Username'], user['FirstName']);
                    res.redirect('/');
                }).catch(
                    async(userError) => {
                        await req.flash('danger', 'Invalid username or password');
                        res.redirect('/login');
                    }
                    )
                    // end
                }else{
                req.flash('danger', 'Invalid username or password');
                res.redirect('/login');
            }
        }
    ).catch(
        async (errorUser) => {
            console.log(errorUser);
            await req.flash('danger', 'Invalid username or password');
                res.redirect('/login');
        }
    )
}

function changePassword(req, res){
    res.render('users/change-password');
}

function saveChangePassword(req,res){
    const sessionUser = req.session['user'];
    if(!sessionUser){
        res.redirect('/login');
    }
    const userEmail = sessionUser['Username'];
    const body = req.body;
    const userBody = {
        Username: userEmail,
        IsActive: 1
    };

    userService.getUserByEmail(userBody).then(
        userDetail => {
            if(userDetail.length > 0){
                const user = userDetail[0];
                //console.log(user);
                //verify old password
                verifyPassword(body['oldPassword'], user['Password'], user['SaltKey']).then(
                    userValid => {
                        //Genrate new password
                        userService.updatePasswordService({
                            Password: body['newPassword'],
                            UserId: user.UserId,
                        }).then(
                            userSuccess => {
                                //console.log('After Change Password');
                                res.redirect('/login');
                            }
                        ).catch(
                            userError => {
                                console.log(userError);
                            }
                        )
                        //end
                        //res.json({msg: 'valid old password'});
                    }
                ).catch(
                    invalidError => {
                        console.log(invalidError);
                        res.redirect('/change-password');
                    }
                )
            }else{
                res.redirect('/change-password');
            }
        }
        ).catch(
            userError => {
                res.json(userError);
            
        }
    )    
}

function forgetPassword(req, res){
    res.render('users/forget-password');

}

function userLogout(req, res){
    req.session.user = null;
    res.redirect('/login');
}

module.exports = {
    login, 
    register,
    forgetPassword,
    onRegister,
    onUserLogin,
    changePassword,
    saveChangePassword,
    userLogout
}