function home(req, res){
    const sessionData = req.session.user;
    //console.log(sessionData);
    res.render('dashboard', {title: 'Dashboard'});
}

function about(req, res){
    res.render('dashboard', {title: 'About Page'});
}

module.exports = {
    home, 
    about
}