const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [
    body('First_Name', 'First name cannot be empty').notEmpty().trim().escape(),
    body('Last_Name', 'Last name cannot be empty').notEmpty().trim().escape(),
    body('CEO_ID', 'CEO ID cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];
    
exports.validateLogIn = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }else{
        return next();
    }
}


exports.validateConnection = [
    body('title', 'Title cannot be empty').isLength({min: 5}).notEmpty().trim().escape(),
    body('topic', 'Topic cannot be empty').notEmpty().trim().escape(),
    body('details', 'Details cannot be empty').isLength({min: 10}).notEmpty().trim().escape(),
    body('date', 'Date is either empty or the date chosen is in the past').notEmpty().isDate().isAfter().trim().escape(),
    body('startTime', 'Start Time is either empty or not in the correct format(HH:MM)').notEmpty().bail().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).trim().escape(),
    body('endTime').notEmpty().bail().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).bail().trim().bail().escape().custom((value, { req }) => {
    if (req.body.startTime > req.body.endTime) {
      throw new Error('End Time is either Empty or it needs to come after Start Time');
    }
    return true;
}
),
    body('venue', 'Venue cannot be empty').isLength({min: 5}).notEmpty().trim().escape(),
    body('imageUrl', 'Image URL cannot be empty').notEmpty().trim().escape()];
