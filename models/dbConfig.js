const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Amal:belhi2020@cluster0.hl5rc.mongodb.net/PFE?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded.')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })

