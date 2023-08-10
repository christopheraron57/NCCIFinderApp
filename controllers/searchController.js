const model = require('../models/connection');
const codeInspectorsModel = require('../models/codeInspector');
const Rsvp = require('../models/rsvps');
const validator = require('validator');
const codeInspector = require('../models/codeInspector');



//GET /connections: send all connections to the user
exports.homepage = (req, res, next) => {
    
    codeInspectorsModel.find()
    .then(codeInspectors => {
        res.render('./search/homepage', { codeInspectors })
    })
    .catch(err => next(err));

}

exports.searching = (req, res, next) => {

    if(req.body.codeInspectorName)
    {

    var name = req.body.codeInspectorName.toLowerCase();
    codeInspectorsModel.find({
        $or: [
          { First_Name: name },
          { Last_Name: name }
        ]
      })
    .then(codeInspectors => {
        res.json({result: codeInspectors});
    })
    .catch(err => next(err));
    }else {
        const query = {};
        const certificatesQuery = {};
      
        if (req.body.type != '') {
          certificatesQuery.Type = req.body.type;
        }
      
        if (req.body.trade != '') {
          certificatesQuery.Trade = req.body.trade;
        }
      
        if (req.body.level != '') {
          certificatesQuery.Level = req.body.level;
        }
      
        if (Object.keys(certificatesQuery).length > 0) {
          query.certificates = { $elemMatch: certificatesQuery };
        }
      
        if (req.body.county) {
            query.County = req.body.county;
          }

          query.Availability_status = true;
        

        codeInspectorsModel.find(query)
          .then(codeInspectors => {
            res.json({ result: codeInspectors });
          })
          .catch(err => next(err));
      }
      
   
}


exports.codeInspectorInfo = (req, res, next) => {
    let id = req.params.id;

    codeInspectorsModel.findById(id)
    .then(codeInspectorPerson=>{
        res.render('./search/codeInspectorInfo', {codeInspectorPerson});
    })
    .catch(err=>next(err));
};



exports.review = (req, res) => {
    console.log("1");
    return res.render('./search/codeInspectorInfo');
};