const mongoose = require("mongoose");


const EnseignantSchema = new mongoose.Schema(
    {
        nom : {
            type: String,
            required: true
        },
        prenom : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true 
        },
        password : {
            type: String,
            required: true
        },
        tel : {
            type: Number,
        },
        etudiants : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Etudiant'
            }
        ]
    }, { timestamps: true}
)

module.exports = mongoose.model('Enseignant', EnseignantSchema )
