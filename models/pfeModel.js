mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var Schema = new mongoose.Schema ({
   
    pfe : {
        type : String
    },
    added_by_id : {
        type : String
    },
    added_by_name : {
        type : String
    },
    accepted_by_id : {
        type : String
    },
    accepted_by_name : {
        type : String
    },
    accepted_by_date : {
        type : String
    }
}) ;

module.exports = mongoose.model('pfe' , Schema) ;
