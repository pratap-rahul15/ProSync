// Creating Moongoose Schema(Model) for Client.
// This schema is used to store the client details in the database.
// Its an object data modeling/mapper (ODM) library for MongoDB and Node.js.

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
 });

 module.exports  = mongoose.model('Client', ClientSchema);