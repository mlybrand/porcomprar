var mongoose = require('mongoose'),
    config = require('../config/config'),
    env = process.env.NODE_ENV,
    dbUri = config[env].dbUri;

//mongoose.connect(dbUri);
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});

var itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    }
});
mongoose.model('Item', itemSchema);