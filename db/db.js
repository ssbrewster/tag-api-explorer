/*jslint node: true */
'use strict';
var async = require('../utils/async.js'),
    db = require('../db/db.js'),
    mongoose = require('mongoose'),
    Tag = require('../models/tags.model.js');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost:27017/');
db.connection.on('error', console.error.bind(console, 'DB connection error.'));

module.exports = {
    createTag: async(function*(tag) {
        var doc,
            findTagInArray,
            savedDoc,
            tagInArray;

        try {
            doc = yield Tag.findOneAndUpdate({}, {}, { 
                upsert: true, new: true 
            }).exec();
            doc.tags.push(tag);
            savedDoc = yield doc.save();

            findTagInArray = yield savedDoc.tags.find(tag);
            tagInArray = findTagInArray.tag == tag.tag;

            return tagInArray ? tagInArray : 'Failed to create a tag'; 
        }
        catch (e) {
            console.error(e);
            throw new Error({status: 501, message: "Save to database failed"});
        }
    }),
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
    retrieveAllTags: (sortBy) => {
        // TODO: replace default param style used below with 
        // ES6 default function params when they are enabled
        // in nodejs v6
        sortBy = typeof sortBy == 'undefined' ? 'tag' : sortBy;
        var sortPath = 'tags.' + sortBy;
        var sortExpr = {};
        sortExpr[sortPath] = 1;

        return Tag.aggregate()
            .unwind('tags')
            .sort(sortExpr)
            .group({_id:'$_id', tags: {$push:'$tags'}})
            .exec();
    }
};

