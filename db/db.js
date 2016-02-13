// TODO: tidy up promise chanins by using shallow chains
var db = require('../db/db.js'),
    mongoose = require('mongoose'),
    Tag = require('../models/tags.model.js');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost:27017/');
db.connection.on('error', console.error.bind(console, 'DB connection error.'));

module.exports = {
    createTag: function(tag) {
        var tagInArray;

        return Tag.findOneAndUpdate({}, {}, { 
            upsert: true, new: true 
        }).exec()
        .then(function(doc) {
            doc.tags.push(tag);
            return doc.save();
        })
        .then(function(savedDoc) {
            tagInArray = savedDoc.tags.find(function(tagObj) {
                return tagObj.tag == tag.tag;
            }); 

            return tagInArray ? tagInArray : 'Failed to create a tag'; 
        })
        .catch(function(err) {
            console.error(err);
            throw new Error({status: 501, message: "Save to database failed"});
        });
    },
    retrieveTag: function(tagName) {

        return Tag.findOneAndUpdate(
            {
                "tags.tag": tagName
            }, 
            {
                $inc: {
                    "tags.$.relevance": 1
                } 
            },
            {
                new: true, 
                select: {
                    _id: 0, tags: {
                        $elemMatch: {
                            tag: tagName
                        }
                    }
                }
            }).exec();
    },
    retrieveAllTags: function() {
        return Tag.find().exec();
    }
};

