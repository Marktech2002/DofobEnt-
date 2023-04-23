const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const productScheme = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: [true, "Please enter a name"],
    // },
    // desc: {
    //     type: String,
    //     require: [true, "Please enter a description"],
    // },
    // price: {
    //     type: Number,
    //     require: [true, "Please enter a price "],
    // },
    image_url: {
        type: String,
        require: [true, "Please provide product imageurl"],
    },
    public_id: {
        type: String,
    },
    // quantity: {
    //     type: Number,
    //     required: [true, "Quantity Please"],
    // },
    // categories: { 
    //     type: String,
    //     required: [true, "Provide categories"],
    // },
    date: {
        type: Date,
        default: Date.now,
    },

}); 

module.exports = mongoose.model('Product' , productScheme)