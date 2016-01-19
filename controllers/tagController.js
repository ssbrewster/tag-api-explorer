var mongoose = require('mongoose'),
    Tag = require('../models/tags.model.js');

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost:27017/');
db.connection.on('error', console.error.bind(console, 'DB connection error.'));

function tagController() {

    return {
        createTag: createTag,
        retrieveTag: retrieveTag,
        retrieveAllTags: retrieveAllTags
    };

    function createTag(tag) {

        return Tag.findOneAndUpdate({}, {}, { 
            upsert: true, new: true 
        }).exec()
        .then(function(doc) {
            doc.tags.push(tag);
            return doc.save();
        })
        .catch(function(err) {
            console.error(err);
            throw new Error({status: 501, message: "Save failed"});
        });
    }

    function retrieveTag(tagName) {

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
            }).exec()
        .then(function(doc) {
            var tag = doc.tags[0];
            return tag;
        })
        .catch(function(err) {
            console.error(err);
            throw new Error({status: 501, message: "GET tag failed"});
        }); 
    }

    function retrieveAllTags() {
        return Tag.find().exec();
    }

}

module.exports = tagController(); 
