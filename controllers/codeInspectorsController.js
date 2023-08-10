
const model = require('../models/codeInspector');
const Connection = require('../models/connection');
const Rsvp = require('../models/rsvps');
const validator = require('validator');

exports.new = (req, res)=>{
        return res.render('./codeInspectors/new');
};

exports.create = (req, res, next)=>{

    let codeInspector = new model(req.body);
    let CEO_ID = req.body.CEO_ID;
    let First_Name = req.body.First_Name;
    let Last_Name = req.body.Last_Name;
    model.findOne({ CEO_ID: CEO_ID })
    model.findOne({ First_Name: First_Name })
    model.findOne({ Last_Name: Last_Name })
    .then(codeInspector => {
        if(First_Name && Last_Name && CEO_ID){
            req.flash('error', 'CEO ID, First Name and Last Name Already In Use, Please Enter Email and New Password To Create Account or Log In');  
            res.redirect('/codeInspectors/new');
        } else {
            req.flash('error', 'Please Create Account');
            res.redirect('/codeInspectors/new');    
        }
    })
    .catch(err => next(err));
    
    if(codeInspector.email)
        codeInspector.email = codeInspector.email.toLowerCase();
    codeInspector.save()
    .then(codeInspector=> {
        req.flash('success', 'Registration Succeeded!');
        res.redirect('/codeInspectors/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('back');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email Has Been Used');  
            return res.redirect('back');
        }
        next(err);
    }); 
    
};

exports.getcodeInspectorLogin = (req, res, next) => {
        return res.render('./codeInspectors/login');
}

exports.login = (req, res, next)=>{

    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
    .then(codeInspector => {
        if (!codeInspector) {
            req.flash('error', 'Wrong Email Address');  
            res.redirect('/codeInspectors/login');
            } else {
            codeInspector.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.codeInspector = codeInspector._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/codeInspectors/profile');
            } else {
                req.flash('error', 'Wrong Password');      
                res.redirect('/codeInspectors/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.reset = (req, res)=>{
    return res.render('./codeInspectors/reset');
};

exports.updateinfo = (req, res)=>{
    return res.render('./codeInspectors/updateinfo');
}


exports.profile = (req, res, next)=>{
    //let id = req.session.codeInspector;
    //let rsvpConnection = [];
/*     Promise.all([model.findById(id), Connection.find({hostName: id}), Rsvp.find({codeInspectorID: id, value: {$in: ['Yes', 'Maybe']}}).populate('connectionID', 'topic title _id')])
    .then(results=>{
        const [codeInspector, connections, rsvps] = results;

        connections.forEach(connection=>{
            connection.details = validator.unescape(connection.details);
            connection.imageUrl = validator.unescape(connection.imageUrl);
            connection.title = validator.unescape(connection.title);
            connection.venue = validator.unescape(connection.venue);
        }) */
/*         rsvps.forEach(rsvp =>{
              let uniqueConnection = Connection.findById(Types.ObjectId(rsvp.connectionID))
            if(uniqueConnection)
            {
                rsvpConnection.push(uniqueConnection);
            }
        }); */
        return res.render('./codeInspectors/profile');
    //})
    //.catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
        else
            res.redirect('/codeInspectors/login');  
    });
   
 };



