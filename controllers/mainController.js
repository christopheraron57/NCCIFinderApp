const model = require('../models/connection');
const validator = require('validator');

//sort the connections array by date and uses that to determine upcoming events
/* function sortByDate(a, b){
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
}
 */

//GET /about page: 
exports.about = (req, res) =>{
    res.render('about');

}

//GET /contact page: 
exports.contact = (req, res) =>{
    res.render('contact');

}
