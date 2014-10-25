var userAuth = module.exports = function(req, res, next){
    console.log(">",req.user);
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        next();
    }else{
        //Not authorized go to the login form
        res.redirect('/admin');
    }
}
