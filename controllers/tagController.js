var db = require('../db/db.js');

module.exports = {
    createTag: tag => db.createTag(tag),
    getOneTag: tagName => db.retrieveTag(tagName),
    getAllTags: () => db.retrieveAllTags()
};
