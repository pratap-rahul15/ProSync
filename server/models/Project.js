// Creating Moongoose Schema(Model) for Project.
// This schema is used to store the project details in the database.

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({ 
    
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    description: {
        type: String,
    },
   

    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }, 

    createdAt: {
        type: Date,
        default: Date.now
    },
 });

 module.exports  = mongoose.model('Project', ProjectSchema);