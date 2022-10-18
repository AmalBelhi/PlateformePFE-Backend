const mongoose = require("mongoose");


const AnneeSchema = new mongoose.Schema(
    {
        aa : {
            type: String,
            required: true
        },
        dateDepot: {
            type: Date,
        },
        dateFermeture: {
            type: Date
        } 
    }, { timestamps: true}
)
    
module.exports = mongoose.model('Annee', AnneeSchema )
    