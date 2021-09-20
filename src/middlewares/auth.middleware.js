function authMiddleware(req, res, next){
    console.log("Middleware is working");
    if(req.session.user){
        res.locals.user = req.session.user;
        next();
    }else{
        res.redirect('/login');
    }
    next();
}


module.exports = authMiddleware;