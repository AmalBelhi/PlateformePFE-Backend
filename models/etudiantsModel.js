const mongoose = require("mongoose");


const EtudiantSchema = new mongoose.Schema(
    {
        cin : {
            type: Number,
            required: true
        },
        nom : {
            type: String,
            required: true
        },
        prenom : {
            type: String,
            required: true
        },
        sexe : {
            type: String,
        },
        imageUrl : {
            type: String,
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
        date_naissance: {
            type: Date,
        }, 
        tel : {
            type: Number,
        },
        etat : {
            type: Boolean
        },
        enseignant :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Enseignant'
        },
        projet: {   
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Projet'
        },
    }, { timestamps: true}
)

module.exports = mongoose.model('Etudiant', EtudiantSchema )



  