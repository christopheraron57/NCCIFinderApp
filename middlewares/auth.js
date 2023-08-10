const Connection = require('../models/connection');

//check if codeInspector is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.codeInspector){
        return next();
    }else {
         req.flash('error', 'You are logged in already');
         return res.redirect('/codeInspectors/profile');
     }
};

//check if codeInspector is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.codeInspector){
        return next();
    }else {
         req.flash('error', 'You need to log in first');
         return res.redirect('/codeInspectors/login');
     }
};

//check if codeInspector is author of the connection
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    Connection.findById(id)
    .then(connection=>{
        if(connection) {
            if(connection.hostName == req.session.codeInspector) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a connection with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
