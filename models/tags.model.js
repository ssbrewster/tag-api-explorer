// Invoke 'strict' JavaScript mode
'use strict';

// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tagsSchema = new Schema({
    id: Schema.ObjectId,
    tags: 	[{
        tag: {type: String, required: true},
        relevance: {type: Number, required: true}
    }]
});

tagsSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('tagsSchema', tagsSchema);
