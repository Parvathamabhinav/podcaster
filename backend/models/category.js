const mongoose = require('mongoose');

const category = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
        unique: true
    },
    podcasts:[
        {
            type: mongoose.Types.ObjectId,
            ref:"podcasts"
        },
    ],
    category : {
        type:mongoose.Types.ObjectId,
        ref:"category",
    }
    
},{timestamps: true}
);

module.exports = mongoose.model('category', category);