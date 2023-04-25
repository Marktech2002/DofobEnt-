const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const orderScheme = mongoose.Schema({
    products: {
        type: Object ,
        required : true ,
    },
    userOrder: {
        type: ObjectID,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        default: 'processing'
    },
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    }
})

module.exports = mongoose.model('Order', orderScheme);