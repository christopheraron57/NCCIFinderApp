const fs = require('fs');
const csv = require('csv-parser');
const codeInspectorCollection = require('../models/codeInspector')



exports.dataLoad = function(){
  codeInspectorCollection.count(function (err, count) {
        if (!err && count === 0) {
          const results = [];
          const map = new Map();
          fs.createReadStream('./data/codeInspectorData.csv')
            .pipe(csv())
            .on('data', (data) => {
              const { CEO_ID, Cert_No, Type, Trade, Level, Exp_Date, ...rest } = data;
              const certificates = { "Cert_No": Cert_No, "Type": Type, "Trade": Trade, "Level": Level, "Exp_Date": Exp_Date };

              if (map.has(data.CEO_ID)) {
                  const obj = map.get(data.CEO_ID);
                  obj.certificates.push(certificates);
                } else {
                  const obj = { CEO_ID, certificates: [certificates], ...rest };
                  map.set(data.CEO_ID, obj);
      
                }
            })
            .on('end', () => {
              results.push(...map.values());
              codeInspectorCollection.insertMany(results, (err, docs) => {
                if (err) {
                  console.log(err);
                } else {
                }
              });
            });
          }else{
            

          }
      
        });
}