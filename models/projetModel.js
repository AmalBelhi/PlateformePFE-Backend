const mongoose = require("mongoose");

const ProjetSchema = mongoose.Schema(
    {
        nom : {
            type: String,
            required: true
        },
        societe: {
            type: String,
        },
        descriptionSociete: {
            type: String,
        },
        definitionProjet: {
            type: String,
        },
        objectifProjet: {
            type: String,
        },
        besoins: {
            type: String,
        },
        technologies: {
            type: String,
        },
        etudiant: {   
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Etudiant'
        },

    }, { timestamps: true}
)
        
module.exports = mongoose.model('Projet', ProjetSchema )
        